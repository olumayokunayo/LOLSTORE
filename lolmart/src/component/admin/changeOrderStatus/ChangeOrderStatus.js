import React, { useState } from "react";
import styles from "./ChangeOrderStatus.module.scss";
import Loader from "../../loader/Loader";
import Card from "../../card/Card";
import { toast } from "react-toastify";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase/config";

const ChangeOrderStatus = ({ order, id }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const editOrder = async (e, id) => {
    e.preventDefault();
    setIsLoading(true);
    const orderConfig = {
      userID: order.userID,
      userEmail: order.userEmail,
      orderDate: order.orderDate,
      orderTime: order.orderTime,
      orderAmount: order.orderAmount,
      orderStatus: status,
      cartItems: order.cartItems,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
      editedAt: Timestamp.now().toDate(),
    };

    try {
      await setDoc(doc(db, "orders", id), orderConfig);
      toast.success("Order status updated successfully");
      setIsLoading(false);
      navigate("/admin/orders");
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div>
        <Card cardClass={styles.card}>
          <h4>Update Order Status</h4>
          <form onSubmit={(e) => editOrder(e, id)}>
            <span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="" disabled>
                  -- Choose one --
                </option>
                <option value="Order Placed">Order Placed</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </span>
            <span>
              <button type="submit" className="--btn --btn-primary">
                Update Status
              </button>
            </span>
          </form>
        </Card>
      </div>
    </>
  );
};

export default ChangeOrderStatus;
