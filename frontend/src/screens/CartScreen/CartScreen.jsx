
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem, removeCartItem } from "../../actions/cartActions"
import { List, Avatar, Button, InputNumber, Empty } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import "./CartScreen.scss"

const CartScreen = ({ match, location, history }) => {

    const productId = match.params.id;

    const qty = location.search ? location.search.split("=")[1] : 1;

    const dispatch = useDispatch();

    const state = useSelector(state => state.cart);
    const { cartItems } = state;

    console.log(cartItems)

    useEffect(() => {
        if (productId) {
            dispatch(addCartItem(productId, qty))
        }
    }, [dispatch, productId, qty])

    return (
        <div className="cart-screen">
            <List
                bordered
                itemLayout="horizontal"
                dataSource={cartItems}
                locale={{
                    emptyText: <Empty description={
                        <span>
                            No Cart Items
                        </span>
                    } />
                }}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar shape="square" size={128} src={item.image} />}
                            title={item.name}
                        />
                        <div className="cartlist-item">
                            <InputNumber min={1} max={item.countInStock} value={item.qty} onChange={(value) => dispatch(addCartItem(item.product, value))} />
                            <p>price:{item.price}</p>
                            <Button danger icon={<DeleteOutlined />} onClick={() => dispatch(removeCartItem(item.product))}>Delete</Button>
                        </div>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default CartScreen
