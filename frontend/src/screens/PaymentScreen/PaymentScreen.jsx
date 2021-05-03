import React, { useState } from 'react'
import { Form, Input, Button, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import "../ShippingScreen/ShippingScreen.scss"
import { savePaymentMethod } from '../../actions/cartActions';
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps"
import "./PaymentScreen.scss"

const ShippingScreen = ({ history }) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if (!shippingAddress) history.push("/shipping")

    const dispatch = useDispatch();

    const [paymentMethod, setPaymentMethod] = useState("PayPal")

    const onChange = e => {
        setPaymentMethod(e.target.value)
    };

    const onFinish = () => {
        dispatch(savePaymentMethod(paymentMethod))
        history.push("/placeorder")
    };

    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };

    return (
        <>
            <CheckoutSteps current={1} />
            <Form
                name="normal_login"
                className="payment-form"
                onFinish={onFinish}

            >
                <Form.Item>
                    <Radio.Group onChange={(e) => onChange(e)} value={paymentMethod}>
                        <Radio style={radioStyle} value={"PayPal"}>
                            PayPal or Credit Card
                    </Radio>
                        <Radio style={radioStyle} value={"Other"} disabled>
                            Other...
                        </Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Continue
                </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default ShippingScreen

