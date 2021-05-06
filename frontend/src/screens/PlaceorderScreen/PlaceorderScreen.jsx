import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Divider,List, Avatar, Table, message} from 'antd';
import { createOrder } from "../../actions/orderActions"
import { useDispatch, useSelector } from 'react-redux';
import "./PlaceorderScreen.scss"
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps"
import { Link } from 'react-router-dom';

const PlaceorderScreen = () => {
    const { Column, ColumnGroup } = Table;
    
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart)
    const {shippingAddress, paymentMethod, cartItems} = cart;

    const order = useSelector(state => state.order)
    const {loading, success, error} = order;

    const addDecimals = (num) => (num).toFixed(2);
        
    const itemsPrice = addDecimals(cartItems.reduce((total,{price, qty}) => total + price * qty,0));
    const shippingPrice = itemsPrice > 100 ? 0 : 100;
    const taxPrice = addDecimals(Number(0.15*itemsPrice));
    const totalPrice = addDecimals(Number(itemsPrice)+Number(shippingPrice)+Number(taxPrice));

    const dataSource = [
        {
            field: 'Items',
            value: `$${itemsPrice}`,
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

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cartItems,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod,
            itemsPrice: itemsPrice,
            taxPrice: taxPrice,
            shippingPrice: shippingPrice,
            totalPrice: totalPrice
        }))
    }

    const key = 'updatable'
    
    useEffect(() => {
        console.log(loading)
        if (loading)
            message.loading({content: "Creating order...", key})
        else if (loading === false && order.order)
            message.success({ content: 'Order Created!', key, duration: 2 });
        else if (loading === false && error)
            message.error({ content: error, key, duration: 2 });

    }, [loading,success])

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
