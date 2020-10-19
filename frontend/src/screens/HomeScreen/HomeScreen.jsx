import React from "react";
import products from "../../products";
import Product from "../../components/Product/Product";
import "./HomeScreen.scss";

const HomeScreen = () => {
  return (
    <div className="latest-products">
      <h2>
        Latest <span>Products</span>
      </h2>
      <div className="products-container">
        {products.map((product) => (
          <Product product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
