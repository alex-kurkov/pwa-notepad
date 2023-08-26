declare global {
  export type Nullable<T> = T | null;
  export type User = Nullable<string>;
  export type CbVoid = () => void;
}

export {};
