import React from "react";
import styles from './Footer.module.scss'

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className={styles.footer}>
      <p>This e-commerce is protected by captcha &copy;{year}</p>
    </footer>
  );
};

export default Footer;
