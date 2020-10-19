import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Products from "../../products";
import "./ProductScreen.scss";
import { Button, InputNumber, Rate, PageHeader, Breadcrumb } from "antd";
import {
  LeftCircleOutlined,
  RightCircleOutlined,
  PlusOutlined,
  HomeOutlined,
  ArrowLeftOutlined,
  HeartTwoTone,
} from "@ant-design/icons";

const ProductScreen = ({ match }) => {
  const product = Products.find((prod) => prod._id === match.params.id);

  const routes = [
    {
      path: "index",
      breadcrumbName: "First-level Menu",
    },
    {
      path: "first",
      breadcrumbName: "Second-level Menu",
    },
    {
      path: "second",
      breadcrumbName: "Third-level Menu",
    },
  ];

  return (
    <div className="product-screen">
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
            <span>Quantity:</span>
            <InputNumber min={1} max={product.countInStock} defaultValue={1} />
            <Button
              className="add-to-cart-btn"
              type="primary"
              icon={<PlusOutlined />}
              size="middle"
            >
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
