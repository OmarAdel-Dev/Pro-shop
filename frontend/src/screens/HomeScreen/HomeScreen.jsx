import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Product from "../../components/Product/Product";
import "./HomeScreen.scss";
import { productsList } from '../../actions/productActions'
import { Alert, Spin } from 'antd';

const HomeScreen = () => {

  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;
  // debugger;
  const dispatch = useDispatch()
  console.log(productList)
  useEffect(() => {
    dispatch(productsList())
  }, []);

  return (
    <div className="latest-products">
      <h2>
        Latest <span>Products</span>
      </h2>
      <div className="products-container">
        {loading ?
          <Spin size="large" tip="Loading..." />
          :
           error ? <Alert message={error} type="error" showIcon /> :
            products.map((product) => (
              <Product product={product} />
            ))}
      </div>
    </div>
  );
};

export default HomeScreen;
