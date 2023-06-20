import React from "react";
import styles from "./ProductItem.module.scss";
import Card from "../../card/Card";
import { Link } from "react-router-dom";
const ProductItem = ({ grid, product, id, name, price, imageURL, desc }) => {

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
      <Link to={`/product-details/${id}`}>
        <div className={styles.img}>
          <img src={imageURL} alt={name} />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          <p style={{fontSize: "2rem",color: "black", textAlign: "center"}}>{`$${price}`}</p>
          <h4 style={{fontSize: "2rem",color: "black", textAlign: "center"}}>{shortenText(name, 18)}</h4>
        </div>
        {!grid && <p className={styles.desc}>{shortenText(desc, 200)}</p>}
        <button className="--btn --btn-danger">Add To Cart</button>
      </div>
    </Card>
  );
};

export default ProductItem;
