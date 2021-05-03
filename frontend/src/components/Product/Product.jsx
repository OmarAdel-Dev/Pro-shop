import React from "react";
import { Link } from "react-router-dom";
import "./Product.scss";
import { Card, Rate } from "antd";

const Product = ({ product }) => {
  const { Meta } = Card;

  const { name, image, category, price, rating, _id } = product;

  return (
    <Link to={`/product/${_id}`}>
      <Card
        hoverable
        style={{ width: 240 ,height: 360}}
        cover={<img alt="example" src={image} />}
      >
        <Meta title={category} />
        <Meta className="product-item-name" title={name} />
        <Meta className="product-item-price" title={`$${price}`} />
        <Rate allowHalf defaultValue={rating} disabled />
      </Card>
    </Link>
  );
};

export default Product;
