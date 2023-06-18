import React, { Children } from "react";
import { useSelector } from "react-redux";
import { selectEmail } from "../../redux/slice/authSlice";
import { Link } from "react-router-dom";
const AdminRouteOnly = ({ children }) => {
  const adminEmail = useSelector(selectEmail);
  if (adminEmail === "admin@gmail.com") {
    return children;
  } else {
    return (
      <section style={{height: "80vh"}}>
      <div className="container">
      <h2>Permission Denied</h2>
        <p>This page can only be accessible by an admin.</p>
        <br />
        <button>
          <Link to="/" className="--btn">Back to Home</Link>
        </button>
      </div>
    
      </section>
    );
  }
};
export const AdminRouteLink = ({ children }) => {
  const adminEmail = useSelector(selectEmail);
  if (adminEmail === "admin@gmail.com") {
    return children;
  } else {
    return null;
  }
};

export default AdminRouteOnly;
