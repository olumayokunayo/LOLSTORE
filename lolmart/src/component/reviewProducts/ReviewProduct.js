import React, { useEffect, useState } from "react";
import styles from "./ReviewProducts.module.scss";
import { useSelector } from "react-redux";
import { selectUserID, selectUserName } from "../../redux/slice/authSlice";
import { Link, useParams } from "react-router-dom";
import Card from "../card/Card";
import StarsRating from "react-star-rate";
import { selectProducts } from "../../redux/slice/productSlice";
import { toast } from "react-toastify";
import { db } from "../../firebase/config";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import useFetchDocument from "../../customHooks/useFetchDocument";
import spinnerImage from "../../assets/spinner.jpg";
const ReviewProduct = () => {
  const { id } = useParams();
  const { document } = useFetchDocument("products", id);
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const [product, setProduct] = useState(null);

  const products = useSelector(selectProducts);
  const userID = useSelector(selectUserID);
  const userName = useSelector(selectUserName);

  useEffect(() => {
    setProduct(document);
  }, [document]);
  // const product = products.find((item) => item.id === id);

  const submitReview = async (e) => {
    e.preventDefault();
    const today = new Date();
    const date = today.toDateString();
    const reviewConfig = {
      userID,
      userName,
      productID: id,
      orderDate: date,
      rate,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),
    };

    try {
      await addDoc(collection(db, "reviews"), reviewConfig);
      toast.success("Review submitted successfully");
      setRate(0);
      setReview("");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <section>
      <div className={`container ${styles.review}`}>
        <h2>Review Products</h2>
        <Link to="/">&larr; Back To Home</Link>
        {product === null ? (
          <img src={spinnerImage} alt="Loading..." style={{width: "50px"}}/>
        ) : (
          <>
            <p>
              <b>Product name: </b> {product.name}
            </p>
            <img
              src={product.imageURL}
              alt={product.name}
              style={{ width: "200px" }}
            />
          </>
        )}

        <Card cardClass={styles.card}>
          <form onSubmit={(e) => submitReview(e)}>
            <label>Review</label>
            <StarsRating
              value={rate}
              onChange={(rate) => {
                setRate(rate);
              }}
            />
            <textarea
              value={review}
              required
              onChange={(e) => setReview(e.target.value)}
              cols="30"
              rows="10"
            ></textarea>
            <button type="submit" className="--btn --btn-primary">
              Submit Review
            </button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default ReviewProduct;
