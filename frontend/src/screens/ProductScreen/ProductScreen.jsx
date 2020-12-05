import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link, history } from "react-router-dom";
import "./ProductScreen.scss";
import { Button, InputNumber, Rate, Breadcrumb, Spin, Alert } from "antd";
import { PlusOutlined, HomeOutlined, HeartTwoTone } from "@ant-design/icons";
import { productDetials } from '../../actions/productActions'

const ProductScreen = ({ history, match }) => {

  const [qty, setQty] = useState(1);

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails;

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(productDetials(match.params.id))
    // eslint-disable-next-line
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }


  return (
    <div className="product-screen">

      {loading ?
        <Spin size="large" tip="Loading..." />
        : error ? <Alert message={error} type="error" showIcon /> :
          <>
            <Breadcrumb>
              <Link to="/">
                <Breadcrumb.Item>
                  <HomeOutlined />
                  <span>Home</span>
                </Breadcrumb.Item>
              </Link>
              <Breadcrumb.Item>Products</Breadcrumb.Item>
            </Breadcrumb>
            <div className="product-container">
              <div className="product-image">
                <img src={product.image} />
              </div>
              <div className="product-details">
                <h2>{product.name}</h2>
                <h1>${product.price}</h1>
                <ul className="product-info">
                  <li className="product-info-item">Category: {product.category}</li>
                  <li className="product-info-item">
                    Availibility:{" "}
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </li>
                </ul>
                <p>{product.description}</p>
                <div className="rate">
                  <Rate allowHalf defaultValue={product.rating} disabled />
                  <span>{product.numReviews} Reviews</span>
                  <Button
                    type="ghost"
                    icon={<HeartTwoTone twoToneColor="#FF8920" />}
                    size="middle"
                  />
                </div>
                <div className="d-flex row add-to-cart">
                  {product.countInStock > 0 &&
                    <>
                      <span>Quantity:</span>
                      <InputNumber min={0} max={product.countInStock} defaultValue={0} value={qty} onChange={setQty} />
                    </>}
                  <Button
                    className="add-to-cart-btn"
                    type="primary"
                    icon={<PlusOutlined />}
                    size="middle"
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add to cart
            </Button>
                </div>
              </div>
            </div>
          </>}
    </div>
  );
};

export default ProductScreen;
