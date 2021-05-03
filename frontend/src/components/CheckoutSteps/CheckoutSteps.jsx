import React from 'react'
import { Steps } from 'antd';
import "./CheckoutSteps.scss"
const CheckoutSteps = ({ current }) => {

    const { Step } = Steps

    return (
        <Steps current={current} >
            <Step title="Shipping Address" />
            <Step title="Payment" />
            <Step title="Place Order" />
        </Steps>
    )
}

export default CheckoutSteps
