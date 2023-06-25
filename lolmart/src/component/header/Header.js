import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { AiOutlineCamera } from "react-icons/ai";

import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast, ToastContainer } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLinks/HiddenLink";
import AdminRouteOnly, {
  AdminRouteLink,
} from "../adminOnlyRoute/AdminRouteOnly";
import {
  CALCULATE_TOTAL_QUANTITY,
  selectCartTotalQuantity,
  selectTotalQuantity,
} from "../../redux/slice/cartSlice";
const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        Lol<span>Mart</span>
      </h2>
    </Link>
  </div>
);

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [scrollPage, setScrollPage] = useState(false);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, []);
  const cart = (
    <span className={styles.cart}>
      <Link to="/cart">
        Cart
        <FaShoppingCart size={20} />
        <p>{cartTotalQuantity}</p>
      </Link>
    </span>
  );
  
  const fixedNavbar = () => {
    if (window.scrollY > 50) {
      setScrollPage(true);
    } else {
      setScrollPage(false);
    }
  };
  window.addEventListener("scroll", fixedNavbar);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName === null) {
          const createUser = user.email.substring(0, user.email.indexOf("@"));
          const username =
            createUser.charAt(0).toUpperCase() + createUser.slice(1);
          setDisplayName(username);
        } else {
          setDisplayName(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
      } else {
        setDisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  });

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout successful");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <header className={scrollPage ? `${styles.fixed}` : null}>
      <ToastContainer />
      <div className={styles.header}>
        {logo}

        <nav
          className={
            showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
          }
        >
          <div
            className={
              showMenu
                ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                : `${styles["nav-wrapper"]}`
            }
            onClick={hideMenu}
          ></div>
          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={22} color="#fff" onClick={hideMenu} />
            </li>

            <li>
              <AdminRouteLink>
                <NavLink to="/admin/home">
                  <button className={styles.admin}>Admin</button>
                </NavLink>
              </AdminRouteLink>
            </li>

            
              <li>
                <NavLink to="/" className={activeLink}>
                  Home
                </NavLink>
              </li>
         
            <li>
              <NavLink to="/contact" className={activeLink}>
                Contact Us
              </NavLink>
            </li>
          </ul>

          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>
              <ShowOnLogout>
                <NavLink to="/login">Login</NavLink>
              </ShowOnLogout>
              <ShowOnLogin>
                <a href="#" className={styles.camera}>
                  <AiOutlineCamera size={18} /> Hi, {displayName}
                </a>
              </ShowOnLogin>

              <ShowOnLogout>
                <NavLink to="/register">Register</NavLink>
              </ShowOnLogout>
              <ShowOnLogin>
                <NavLink to="/order-history" className={activeLink}>
                  My Orders
                </NavLink>
              </ShowOnLogin>

              <ShowOnLogin>
                <NavLink to="/" onClick={logoutHandler}>
                  Logout
                </NavLink>
              </ShowOnLogin>
            </span>
          {cart}
          </div>
        </nav>

        <div className={styles["menu-icon"]}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
