import React, { createContext, useContext, useEffect } from 'react';
import { idb } from 'src/utils/idb';
import { useLocaStorage } from 'utils/useLocalStorage';

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
    if (!user) return;
    idb.openDB(user)
  }, [user])

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
