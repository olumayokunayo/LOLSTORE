import React from "react";
import ReactDOM from "react-dom";
import styles from "./Loader.module.scss";
import LoaderImage from "../../assets/loader.gif";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <img src={LoaderImage} alt="Loader" />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;
