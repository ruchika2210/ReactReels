import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contextContainer/AuthProvider";
import { database, storage } from "../firebase";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Signup = () => {
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(false);
  const [loader, setloader] = useState(false);
  const [file, setfile] = useState(null);
  const navigate = useNavigate();

  const { signup } = useContext(AuthContext);

  useEffect(() => {
    console.log("Signup  is rendered");
  });

  function handleFileSubmit(e) {
    let file = e?.target?.files[0];
    if (file != null) {
      console.log(file);
      setfile(file);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    try {
      setloader(true);
      let response = await signup(email, password);
      let uid = response.user.uid;
      const storageRef = ref(
        storage,
        `/users/${uid}/profileImage/${file.name}`
      );
      const uploadTaskListener = uploadBytesResumable(storageRef, file);
      // f1 -> progress
      // f2 -> error
      // f3 -> success
      uploadTaskListener.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(progress);
        },
        (error) => {
          seterror(error);
          setloader(false);
        },
        () => {
          getDownloadURL(uploadTaskListener.snapshot.ref).then(
            (downloadURL) => {
              const dbRef = doc(database, "users", uid);
              setDoc(dbRef, {
                email: email,
                userId: uid,
                username,
                createdAt: Timestamp.fromDate(new Date()),
                profileUrl: downloadURL,
              })
                .then(() => {
                  console.log(
                    "Document has been added successfully with the custom ID:",
                    uid
                  );
                })
                .catch((error) => {
                  setloader(false);
                  console.log("Error adding document:", error);
                });

              setloader(false);
              navigate("/");
            }
          );
        }
      );
    } catch (error) {
      console.log(error);
      seterror(error);
      setloader(false);
    }
  }
  return (
    <div>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="">UserName</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => {
              setusername(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="">Email</label>
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
          <label htmlFor="">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              handleFileSubmit(e);
            }}
          />
        </div>
        <button type="submit" disabled={loader}>
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
