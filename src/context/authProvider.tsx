import React, { createContext, useContext, useEffect } from 'react';
import { idb } from 'src/utils/idb';
import { useLocaStorage } from 'utils/useLocalStorage';
import { useData } from './dataProvider';

interface IAuthContext {
  user: User;
  login: (user: User, cb?: CbVoid) => void;
  logout: (cb?: CbVoid) => void;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setNotes, setLoading, setActiveNote } = useData();
  const [user, setUser] = useLocaStorage<User>('user', null);

  const login = (newUser: User, cb?: CbVoid) => {
    setUser(newUser);
    if (typeof cb === 'function') cb();
  };

  const logout = (cb?: CbVoid) => {
    setUser(null);
    if (typeof cb === 'function') cb();
  };

  useEffect(() => {
    setLoading(true);
    if (user) {
      idb.openDB(user);
      idb.getAll<Note>().then(setNotes);
      } else {
        setNotes([]);
        setActiveNote(null);
      }
      setLoading(false);

  }, [setActiveNote, setLoading, setNotes, user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
