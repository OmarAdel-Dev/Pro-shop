import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Divider,List, Avatar, Table} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import "./PlaceorderScreen.scss"
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps"
import { Link } from 'react-router-dom';

const PlaceorderScreen = () => {
    const { Column, ColumnGroup } = Table;
    const cart = useSelector(state => state.cart)
    const {shippingAddress, paymentMethod, cartItems} = cart;

    const addDecimals = (num) => (num).toFixed(2);
        
    const ItemsPrice = addDecimals(cartItems.reduce((total,{price, qty}) => total + price * qty,0));
    const shippingPrice = ItemsPrice > 100 ? 0 : 100;
    const taxPrice = addDecimals(Number(0.15*ItemsPrice));
    const totalPrice = addDecimals(Number(ItemsPrice)+Number(shippingPrice)+Number(taxPrice));

    const dataSource = [
        {
            field: 'Items',
            value: `$${ItemsPrice}`,
        },
        {
            field: 'Shipping',
            value: `$${shippingPrice}`,
        },
        {
            field: 'Taxes',
            value: `$${taxPrice}`,
        },
        {
            field: 'Total',
            value: `$${totalPrice}`,
        },
      ];

    const placeOrderHandler = (params) => {
        
    }
    
    useEffect(() => {
        console.log(paymentMethod)
    }, [paymentMethod])

    return (
        <>
          <CheckoutSteps current={2} />
          <Row className="order-details-container">
            <Col flex={3.5} className="order-details">
                <div>
                    <h2>Shipping Address</h2>
                    <span>{shippingAddress.address} {shippingAddress.city}</span>,
                    <span>{shippingAddress.postalCode}</span>,
                    <span>{shippingAddress.country}</span>
                </div>
                <Divider />
                <div>
                    <h2>Payment Method</h2>
                    <span>Mehtod: {paymentMethod}</span>
                </div>
                <Divider />
                <List
                    header={<h2>Cart Items</h2>}
                    itemLayout="horizontal"
                    dataSource={cartItems}
                    renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                        avatar={<Avatar size="large" src={item.image} />}
                        title={<Link to={`/product/${item.product}`}>{item.name}</Link>}
                        description={<div>{item.qty} X ${item.price} = ${item.qty*item.price}</div>}
                        />
                    </List.Item>
                    )}
                />
            </Col>
            <Col flex={1.5}>
            <Table dataSource={dataSource} pagination={false} bordered footer={() => 
                <Button type="primary" className="login-form-button" onClick={placeOrderHandler}>
                        Place Order
                </Button>}>
                <ColumnGroup title="Order Summary">
                    <Column title="Field" dataIndex="field" key="field" />
                    <Column title="Value" dataIndex="value" key="value" />  
                </ColumnGroup>
            </Table>
            </Col>
            </Row>
            
        </>
    )
}

export default PlaceorderScreen
