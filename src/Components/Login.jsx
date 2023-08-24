import React, { useState, useContext } from "react";
import { AuthContext } from "../contextContainer/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(false);
  const [loader, setloader] = useState(false);
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloader(true);
      let res = await login(email, password);
      console.log("Response", res);
      navigate("/");
    } catch (error) {
      seterror(true); // Corrected: seterror(true) on error
      setloader(false);
    }
    setemail("");
    setpassword("");
    setloader(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loader}>
          {loader ? "Logging in..." : "Login"} {/* Add button label */}
        </button>
        {error && <p>Error occurred while logging in.</p>}{" "}
        {/* Display error message */}
      </form>
    </div>
  );
};

export default Login;
