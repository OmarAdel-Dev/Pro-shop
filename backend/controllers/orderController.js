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

// @desc    Get an order by ID
// @route   GET /api/order/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
    
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    console.log(order)
    if(order){
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found') 
    }
});

export { addOrderItems, getOrderById };
