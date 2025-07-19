import axios from "axios";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";

import AuthContext from "./AuthContext";
import app from "./../Firebase/Firebase.config";

const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleProvider = new GoogleAuthProvider();

  const googleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const loggedInUser = result.user;

      // Update profile explicitly in case photoURL or displayName are missing/need refresh
      await updateProfile(loggedInUser, {
        displayName: loggedInUser.displayName,
        photoURL: loggedInUser.photoURL,
      });

      setUser(loggedInUser);

      return loggedInUser;
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      throw error;
    }
  };

  const updateUser = (userInfo) => {
    return updateProfile(auth.currentUser, userInfo);
  };

  const removeUser = (user) => {
    return deleteUser(user);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        axios.get("http://localhost:5000", {
          headers: {
            Authorization: `Bearer ${currentUser.accessToken}`,
          },
        });
      }

      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    setUser,
    logOut,
    googleSignIn,
    updateUser,
    removeUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
