import React, { useContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signInAnonymously } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login: (email, password) => auth.signInWithEmailAndPassword(email, password),
    signup: (email, password) => auth.createUserWithEmailAndPassword(email, password),
    logout: () => auth.signOut(),
    signInWithGoogle: () => {
      const provider = new GoogleAuthProvider();
      return signInWithPopup(auth, provider);
    },
    signInWithFacebook: () => {
      const provider = new FacebookAuthProvider();
      return signInWithPopup(auth, provider);
    },
    signInAnonymously: () => signInAnonymously(auth),
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}