import React, { useState, useContext } from "react";
import { AuthContext } from "../contextContainer/AuthProvider";
const Feed = () => {
  const [loading, setLoading] = useState(false);
  const { signout } = useContext(AuthContext);

  const handleLogout = async () => {
    setLoading(true);
    await signout();
    setLoading(false);
    try {
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div>
      Feed
      <button onClick={handleLogout} disabled={loading}>
        Logout
      </button>
    </div>
  );
};

export default Feed;
