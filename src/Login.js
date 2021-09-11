import React, { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import app from "./config";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [status, setStatus] = useState();

  const SignInWithProvider = (e, pro) => {
    e.preventDefault();
    if (pro === "google") {
      SignInWithGoogle();
    }
    //    incase we have mutiple providers
  };

  const SignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
      .then((result) => {
        // const user = result.user;

        setStatus("Success");
        setTimeout(() => setStatus(undefined), 2500);
        window.location.href = "/";
        // ...
      })
      .catch((error) => {
        setStatus(error.message);
      });
  };

  const HandleClick = async (e) => {
    e.preventDefault();
    const auth = await getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        // ...
        setStatus("Success !");

        window.location.href = "/";
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        console.log(error);

        setStatus(
          "Something Went Wrong " +
            " This Could Be a result of Incorrect Email or Bad Internet"
        );
      });
  };
  return (
    <div className="">
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
        <div className={"form-container"}>
          <h3>Login To Your Account</h3>
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex-me">
              <button
                onClick={HandleClick}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className="btn btn-primary"
              >
                Submit
              </button>

              <button
                onClick={(e) => SignInWithProvider(e, "google")}
                className="btn btn-info"
              >
                {" "}
                Sign Up With Google
              </button>
              <Link to="/Signup">Not a User Sign Up Here</Link>
            </div>
          </form>
        </div>
      )}

      {/* modal */}
    </div>
  );
}

export default Login;
