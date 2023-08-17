import react, { useContext, useEffect, useState } from "react";
import { Routes, Route, BrowserRouter, Navigate, Link } from "react-router-dom";

import "./App.css";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Feed from "./Components/Feed";
import Profile from "./Components/Profile";
// let isSignedUp = Math.random() > 0.5 ? true : false;
let isSignedUp = true;

function App() {
  useEffect(() => {
    console.log("App is rendered");
  });

  return (
    <>
      <h1>App Component</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/profile"
            exact
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />{" "}
          <Route
            path="/"
            exact
            element={
              <PrivateRoute>
                <Feed />
              </PrivateRoute>
            }
          />{" "}
        </Routes>
      </BrowserRouter>
    </>
  );
}

function PrivateRoute({ children }) {
  console.log({ children });
  return isSignedUp == true ? <>{children}</> : <Navigate to="/login" />;
}

export default App;
