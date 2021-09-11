import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "./config";
// import { Link } from "react-router-dom";
import { getFirestore } from "firebase/firestore";

function SignUp() {
  const [email, setEmail] = useState();
  const [Password, setPassword] = useState();
  const [date, setDate] = useState();
  const [status, setStatus] = useState();
  const HandleClick = async (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, Password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;

        console.log(user);

        try {
          const cityRef = doc(getFirestore(app), "Users", user.uid);
          await setDoc(cityRef, { user: user.email, date: date });
          setStatus("Succces !");
          setTimeout(() => {
            window.location.href = "/";
          }, 600);
        } catch (e) {
          setStatus("An Error Occurred");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        setStatus(errorCode);
        // ..
      });
  };
  return (
    <div>
      {status ? (
        <div className="modal-container show">
          <div className="modal-body show">
            {status}
            <button
              onClick={() => setStatus(undefined)}
              className={"btn btn-danger"}
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <div>
          <form>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter Your Email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter Your Password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <input
              type="date"
              placeholder="Enter Your Date"
              onChange={(e) => setDate(e.target.value)}
            />
            <button onClick={HandleClick} className="btn btn-success">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default SignUp;
