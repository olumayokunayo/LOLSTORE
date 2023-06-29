import React, { useEffect, useState } from "react";
import styles from "./OrderDetails.module.scss"
import spinnerImage from "../../../assets/spinner.jpg"
import { Link, useParams } from "react-router-dom";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import ChangeOrderStatus from "../changeOrderStatus/ChangeOrderStatus";
const OrderDetails = () => {
 
  const [order, setOrder] = useState(null);
  console.log(order);
  const { id } = useParams();
  const { document } = useFetchDocument("orders", id);

  useEffect(() => {
    setOrder(document);
  }, [document]);

  console.log(order);

  return (
    <>
    <div className={styles.table}>
      <h1>Order Details</h1>
      <div>
        <Link to="/admin/orders">&larr; Back To Orders</Link>
      </div>
      <br />
      {order === null ? (
        <img src={spinnerImage} alt="Loading..." style={{ width: "50px" }} />
      ) : (
        <>
          <p>
            <b>Order ID</b> {order.id}
          </p>
          <p>
            <b>Order Amount</b> {order.orderAmount}
          </p>
          <p>
            <b>Order Status</b> {order.orderStatus}
          </p>
          <p>
            <b>Shipping Address</b> {order.shippingAddress.line1}, {order.shippingAddress.line2} {order.shippingAddress.city}
            <br />
            <b>State:</b> {order.shippingAddress.state}
            <br />
            <b>Country:</b>
            {order.shippingAddress.country}
            <br />
            <b>Tel:</b>{order.shippingAddress.phone}
          </p>
          <br />
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.cartItems.map((cart, index) => {
                const { id, name, price, imageURL, cartQuantity } = cart;
                return (
                  <tr key={id}>
                    <td>
                      <b>{index + 1}</b>
                    </td>
                    <td>
                      <p>
                        <b>{name}</b>
                      </p>
                      <img
                        src={imageURL}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{`$${price}`}</td>
                    <td>{cartQuantity}</td>
                    <td>{(cartQuantity * price).toFixed(2)}</td>
                    
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}

      <ChangeOrderStatus  order={order} id={id}/>
    </div>
    </>
  );



};

export default OrderDetails;
