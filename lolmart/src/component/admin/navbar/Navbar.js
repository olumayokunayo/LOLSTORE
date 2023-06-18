import React from "react";
import styles from "./Navbar.module.scss";
import { AiOutlineCamera } from "react-icons/ai";
import { useSelector } from "react-redux";
import { selectUserName } from "../../../redux/slice/authSlice";
import { NavLink } from "react-router-dom";

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");
const Navbar = () => {
  const user = useSelector(selectUserName);
  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <AiOutlineCamera size={40} color="#fff" />
        <h3>{user}</h3>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/home" className={activeLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-products" className={activeLink}>
              All Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-product/ADD" className={activeLink}>
              Add Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className={activeLink}>
              Orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
