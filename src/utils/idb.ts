class Idb {
  static __instance: Nullable<Idb> = null;
  private baseName: Nullable<string> = null;
  private readonly COLL_NAME = 'notes';

  constructor() {
    if (Idb.__instance) {
      return Idb.__instance;
    }
    Idb.__instance = this;
  }

  openDB(name: string): Promise<IDBDatabase> {
    this.baseName = name;

    return new Promise((resolve, reject) => {
      const openRequest = indexedDB.open(name, 1);
      openRequest.onerror = () => reject(openRequest.error);

      openRequest.onupgradeneeded = () => {
        const db = openRequest.result;

        if (db.objectStoreNames.contains(name)) {
          return;
        }

        db.createObjectStore(this.COLL_NAME, {
          keyPath: 'uuid',
          autoIncrement: true,
        });
      };

      openRequest.onsuccess = () => resolve(openRequest.result);
    });
  }

  addItem(item: unknown) {
    return new Promise((resolve, reject) => {
      if (!this.baseName || !this.COLL_NAME) return;
      this.openDB(this.baseName)
      .then((db) => this.getStore(db, 'readwrite'))
      .then((store) => {
        // using put method instead of add to rewrite existing '{keyPath: unique, ...}' objects
        // collections.add(item) // with ConstraintError
        const request = store.put(item);

          this.handleRequestEvents(request, resolve, reject);
        });
    });
  }

  getAll<P>(): Promise<P[]> {
    return new Promise((resolve, reject) => {
      if (!this.baseName) return;
      this.openDB(this.baseName)
        .then((db) => this.getStore(db))
        .then((store) => {
          const request = store.getAll();
          this.handleRequestEvents(request, resolve, reject);
        })
        .catch((e) => reject(e));
    });
  }

  delete(uuid: number) {
    return new Promise((resolve, reject) => {
      if (!this.baseName) return;
      this.openDB(this.baseName)
        .then((db) => this.getStore(db, 'readwrite'))
        .then((store) => {
          const request = store.delete(uuid);
          this.handleRequestEvents(request, resolve, reject);
        });
    });
  }

  private getStore(
    db: IDBDatabase,
    transactionMode: IDBTransactionMode = 'readonly'
  ) {
    return Promise.resolve(
      db
        .transaction(this.COLL_NAME, transactionMode)
        .objectStore(this.COLL_NAME)
    );
  }

  private handleRequestEvents<P>(
    request: IDBRequest,
    resolve: (value: P) => void,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reject: (reason?: any) => void
  ) {
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  }
}

export const idb = new Idb();
