import React, { useState } from "react";
import app from "./config";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
function Home() {
  let history = useHistory();

  const [user, setUser] = useState();
  const [userDate, setUserDate] = useState();
  const auth = getAuth(app);
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      setUser(user);
      // const uid = user.uid;
      console.log(user);
      // ...

      const docRef = doc(getFirestore(app), "Users", user.uid);
      const docSnap = await getDoc(docRef);
      setUserDate(docSnap);
    } else {
      history.push("/login");
    }
  });
  return (
    <div>
      {user ? (
        <div>
          <h3 className={"mt-3"}>Welcome:{user?.email}</h3>
          <button className={"btn btn-danger"} onClick={() => signOut(auth)}>
            Sign Out
          </button>
          <br />
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          {userDate ? (
            <h5>And Your Date of Birth : {userDate.data().date}</h5>
          ) : (
            <h4>Redirecting...</h4>
          )}
        </div>
      ) : (
        <h4>UnAuthicated User</h4>
      )}
    </div>
  );
}

export default Home;
