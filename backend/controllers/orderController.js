import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc    Create an Order
// @route   POST /api/order
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body

    const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    })

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
});

export { addOrderItems };
