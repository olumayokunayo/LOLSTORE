import React, { Fragment, useState } from "react";
import LoginImage from "../../assets/login.png";
import styles from "./Auth.module.scss";
import { AiOutlineGoogle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../component/card/Card";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../component/loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useSelector } from "react-redux";
import { selectPreviousURL } from "../../redux/slice/cartSlice";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const previousURL = useSelector(selectPreviousURL);

  const redirectUser = () => {
    if (previousURL.includes("cart")) {
      return navigate("/cart");
    } else {
      navigate("/");
    }
  };

  const loginHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsLoading(false);
        toast.success("Login successful");
        redirectUser()
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  const provider = new GoogleAuthProvider();
  const googleBtnHandler = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success("Login successful");
        redirectUser()
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <Fragment>
      <ToastContainer />
      {isLoading && <Loader />}
      <div className={styles["auth-div"]}>
        <div className={styles.imageDiv}>
          <img src={LoginImage} alt="Login" width={400} />
        </div>
        <div className={styles["auth-form"]}>
          <Card>
            <h1>Login</h1>
            <form onSubmit={loginHandler}>
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
              <button type="submit">Login</button>
              <p> -- or -- </p>
            </form>

            <button
              type="submit"
              className={styles.googleBtn}
              onClick={googleBtnHandler}
            >
              Sign in with Google
              <AiOutlineGoogle size={20} />
            </button>
            <div className={styles.register}>
              <p>Don't have an account?</p>
              <Link to="/register">Register</Link>
            </div>
          </Card>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
