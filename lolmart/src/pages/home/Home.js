import React, { useEffect } from "react";
import Slider from "../../component/slider/Slider";
import Product from "../../component/product/Product";

const Home = () => {
  const url = window.location.href;
  const scrollToProducts = () => {
    if (url.includes("#products")) {
      window.scrollTo({
        top: 700,
        behavior: "smooth",
      });
      return;
    }
  };

  // useEffect(() => {
  //   scrollToProducts();
  // }, []);
  return (
    <div>
      {/* <Slider /> */}
      <Product />
    </div>
  );
};

export default Home;
