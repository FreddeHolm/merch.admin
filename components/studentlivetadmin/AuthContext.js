import { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { firebaseConfig } from './firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  const auth = getAuth(firebaseConfig.app);

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      setLoading(true); // Ensure loading is set to true initially
      if (!user) {
        setCurrentUser(null);
        setEmailVerified(false);
        setLoading(false);
      } else {
        const token = await user.getIdToken();
        setCurrentUser(user);
        setEmailVerified(true);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  const value = {
    currentUser,
    emailVerified,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};