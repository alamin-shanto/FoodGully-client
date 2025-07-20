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
import app from "../Firebase/Firebase.config";
import axios from "axios";

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = (userInfo) => updateProfile(auth.currentUser, userInfo);

  const removeUser = (user) => deleteUser(user);

  const logOut = async () => {
    setLoading(true);
    localStorage.removeItem("access-token");
    await signOut(auth);
    setUser(null);
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);

      if (currentUser) {
        try {
          // Get fresh Firebase ID token (force refresh)
          const idToken = await currentUser.getIdToken(true);

          // Request backend JWT
          const res = await axios.post(
            "https://food-gully-server.vercel.app/jwt",
            {},
            {
              headers: {
                Authorization: `Bearer ${idToken}`,
              },
            }
          );

          // Store backend JWT token in localStorage
          localStorage.setItem("access-token", res.data.token);

          // Set React user state
          setUser(currentUser);
        } catch (error) {
          console.error("Backend JWT error:", error);
          localStorage.removeItem("access-token");
          setUser(null);
        }
      } else {
        // No Firebase user logged in
        localStorage.removeItem("access-token");
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
    googleSignIn,
    updateUser,
    removeUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
