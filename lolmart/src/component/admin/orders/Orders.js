import React, { useEffect } from "react";
import styles from "./Orders.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../loader/Loader";
import {
  STORE_ORDERS,
  selectOrderHistory,
} from "../../../redux/slice/orderSlice";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import { selectUserID } from "../../../redux/slice/authSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading } = useFetchCollection("orders");
  const orders = useSelector(selectOrderHistory);
  const userID = useSelector(selectUserID);
  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [dispatch, data]);
  const handleClick = (id) => {
    navigate(`/admin/order-details/${id}`);
  };
  // const filteredOrders = orders.filter((order) => order.userID === userID);
  return (
    <>
      <div className={styles.order}>
        <h2>Your Order History</h2>
        <p>
          Open an order to change <b>Order Status</b>
        </p>
        <br />

        <>
          {isLoading && <Loader />}
          <div className={styles.table}>
            {orders.length === 0 ? (
              <>
                <p>No order found</p>
                <button className="--btn --btn-primary">
                  <Link to="/">Back To Home</Link>
                </button>
              </>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Date</th>
                    <th>Order ID</th>
                    <th>Order Amount</th>
                    <th>Order Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => {
                    const {
                      id,
                      orderDate,
                      orderAmount,
                      orderStatus,
                      orderTime,
                    } = order;

                    return (
                      <tr key={id} onClick={() => handleClick(id)}>
                        <td>{index + 1}</td>
                        <td>
                          {orderDate} at {orderTime}
                        </td>
                        <td>{id}</td>
                        <td>{`$${orderAmount}`}</td>
                        <td>
                          <p
                            className={
                              orderStatus === "Processing" ||
                              orderStatus === "Delivered"
                                ? styles.processing
                                : styles.pending
                            }
                          >
                            {orderStatus}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      </div>
    </>
  );
};

export default Orders;
