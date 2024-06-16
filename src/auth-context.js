import React, { useContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Setting up auth state change listener");
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed, current user:", user);
      setCurrentUser(user);
      setLoading(false);
    });

    return () => {
      console.log("Cleaning up auth state change listener");
      unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    try {
      console.log("Attempting to log in with email:", email);
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const signup = async (email, password) => {
    try {
      console.log("Attempting to sign up with email:", email);
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Signup successful");
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      console.log("Attempting to log out");
      await signOut(auth);
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      console.log("Attempting to log in with Google");
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log("Google login successful");
    } catch (error) {
      console.error("Google login error:", error);
      throw error;
    }
  };

  const signInWithFacebook = async () => {
    try {
      console.log("Attempting to log in with Facebook");
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider);
      console.log("Facebook login successful");
    } catch (error) {
      console.error("Facebook login error:", error);
      throw error;
    }
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    signInWithGoogle,
    signInWithFacebook
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
