import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState("");
  const [loading, setloading] = useState(true);
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function signout() {
    return await auth.signOut();
  }

  async function signup(email, password) {
    try {
      console.log(auth);
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error during signup:", error);
      throw error;
    }
  }

  useEffect(() => {
    console.log("event listener add");
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setcurrentUser(user);
      setloading(false);
      console.log("inside listener ", user);
    });
    return unsubscribe;
  }, []);

  let valueToShare = {
    currentUser,
    signout,
    login,
    signup,
  };
  return (
    <AuthContext.Provider value={valueToShare}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
