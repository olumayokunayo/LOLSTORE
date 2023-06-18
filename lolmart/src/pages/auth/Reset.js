import React, { Fragment, useState } from "react";
import styles from "./Auth.module.scss";
import ResetImage from "../../assets/forgot.png";
import Card from "../../component/card/Card";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import {toast, ToastContainer} from 'react-toastify'
import Loader from "../../component/loader/Loader";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const resetHandler = (e) => {
    e.preventDefault();
    setIsLoading(true)
    sendPasswordResetEmail(auth, email)
  .then(() => {
    setIsLoading(false)
    toast.success('Reset link sent to your email.')
    // Password reset email sent!
  })
  .catch((error) => {
    setIsLoading(false)
    toast.error(error.message)
  });

  };
  return (
    <Fragment>
    {isLoading && <Loader />}
    <ToastContainer />
      <div className={styles["auth-div"]}>
        <div>
          <img src={ResetImage} alt="Login" width={400} />
        </div>
        <div className={styles["auth-form"]}>
          <Card>
            <h1>Reset</h1>
            <form onSubmit={resetHandler}>
              <input
                type="text"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">Reset</button>
            </form>

            <div className={styles.active}>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          </Card>
        </div>
      </div>
    </Fragment>
  );
};

export default Reset;
