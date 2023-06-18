import React, { Fragment, useState } from "react";
import RegisterImage from "../../assets/register.png";
import styles from "./Auth.module.scss";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../component/card/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../component/loader/Loader";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const registerHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
    }
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setIsLoading(false);
        toast.success("Registration successful.");
        navigate("/login");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };
  return (
    <Fragment>
      <ToastContainer />
      {isLoading && <Loader />}
      <div className={styles["auth-div"]}>
        <div className={styles["auth-form"]}>
          <Card>
            <h1>Register</h1>
            <form onSubmit={registerHandler}>
              <input
                type="text"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type="submit">Register</button>
            </form>

            <div className={styles.register}>
              <p>Already have an account?</p>
              <Link to="/login">Login</Link>
            </div>
          </Card>
        </div>
        <div className={styles.imageDiv}>
          <img src={RegisterImage} alt="Login" width={400} />
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
