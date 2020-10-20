import React, { useEffect, useState } from "react";
import Product from "../../components/Product/Product";
import "./HomeScreen.scss";
import axios from "axios";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };
    fetchProducts();
  }, []);

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
