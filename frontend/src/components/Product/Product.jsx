import React from 'react'
import { Card, Rate } from 'antd'
import "./Product.scss";

const Product = ({ product }) => {

    const { Meta } = Card;

    const { name, image, category, price, rating } = product;

    return (
        <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={image} />}
        >
            <Meta title={category} />
            <Meta className="product-item-name" title={name} />
            <Meta className="product-item-price" title={`$${price}`} />
            <Rate allowHalf defaultValue={rating} disabled />
        </Card>
    )
}

export default Product
