/* eslint-disable react-refresh/only-export-components */
import  { createContext, useState, useEffect, useContext, PropsWithChildren } from 'react';
import 'firebase/auth';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

// Define the shape of the context value
export type AuthContextType = {
  user: User | null;
  loading: boolean;
};

// Create the context
export const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const useAuth = () => useContext(AuthContext);

// Create a provider component
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};