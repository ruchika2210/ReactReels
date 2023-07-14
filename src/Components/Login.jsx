import react, { useState, useEffect } from "react";
import auth from "../firebase";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(false);
  const [mainloader, setMainloader] = useState(true);

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    try {
      setLoader(true);
      let res = await auth.signInWithEmailAndPassword(email, password);
      console.log(res.user, "email and password");
      setUser(res.user);
      setLoader(false);
    } catch (error) {
      setError(true);
      setLoader(false);
    }
    setEmail("");
    setPassword("");
  };
  const handleLogout = async () => {
    setLoader(true);
    await auth.signOut();
    setUser(null);
    setLoader(false);
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setMainloader(false);
    });
  }, []);

  return (
    <>
      {console.log(user)}
      {mainloader == true ? (
        <h1>Wait for a second</h1>
      ) : loader == true ? (
        <h1>Loading...</h1>
      ) : user != null ? (
        <h1>
          User Logged in {user.uid}
          <button onClick={handleLogout}>Logout</button>
        </h1>
      ) : (
        <>
          <h1>Firebase Login</h1>
          <form>
            <input
              type="email"
              value={email}
              onChange={handleEmailInput}
            ></input>
            <br></br>
            <input
              type="password"
              value={password}
              onChange={handlePasswordInput}
            ></input>
            <br></br>
            <input type="button" value="submit" onClick={handleSubmit}></input>
          </form>
        </>
      )}
    </>
  );
}
//main loader

export default Login;
