import React, { useState } from "react";
import auth from "../firebase";

const AuthContext = React.createContext();
export function AuthProvider({ children }) {
  //   const [currentuser, setUser] = useState();
  //   const [loading, setLoading] = useState(true);
  async function login(email, password) {
    return await auth.signInWithEmailAndPassword(email, password);
  }
  async function signOut(email, password) {
    return await auth.signOut();
  }

  const value = {
    login,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
