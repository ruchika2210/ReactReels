import react, { Children, useState } from "react";
import {  Routes, Route, BrowserRouter,Navigate   } from 'react-router-dom'

import "./App.css";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Feed from "./Components/Feed";
import {AuthProvider} from "./contextContainer/AuthContext"
let isSignedUp=Math.random()>0.5?true:false;

function App() {
  return (
    <>
    <BrowserRouter>
    <AuthProvider>    
        <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/" exact element={<PrivateRoute><Feed/></PrivateRoute>} />

      </Routes>
      </AuthProvider>

      </BrowserRouter>
    </>
  );
}


function PrivateRoute({children}) {

  return isSignedUp===false ?<>{children} </> : <Navigate to="/login" />;
}

export default App;
