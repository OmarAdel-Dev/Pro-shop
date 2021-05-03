import React, { useState } from 'react'
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import "./ShippingScreen.scss"
import { saveShippingAddress } from '../../actions/cartActions';
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps"

const ShippingScreen = ({ history }) => {


    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch();

    const [address, setAddress] = useState(shippingAddress && shippingAddress.address)
    const [city, setCity] = useState(shippingAddress && shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress && shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress && shippingAddress.country)

    const onFinish = () => {
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history.push("/payment")
    };

    return (
        <>
            <CheckoutSteps current={0} />
            <Form
                name="normal_login"
                className="address-form"
                onFinish={onFinish}
                initialValues={{
                    ["address"]: address ? address : "",
                    ["city"]: city ? city : "",
                    ["postalCode"]: postalCode ? postalCode : "",
                    ["country"]: country ? country : "",
                }}
            >

                <Form.Item
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your address!',
                        },
                    ]}

                >
                    <Input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
                </Form.Item>
                <Form.Item
                    name="city"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your city!',
                        },
                    ]}

                >
                    <Input
                        value={city}
                        onChange={(e) => setCity(e.target.value)} placeholder="City" />
                </Form.Item>
                <Form.Item
                    name="postalCode"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Postal Code!',
                        },
                    ]}
                >
                    <Input
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="Postal Code"
                    />
                </Form.Item>
                <Form.Item
                    name="country"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Country!',
                        },
                    ]}
                >
                    <Input
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="Country"
                    />
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

