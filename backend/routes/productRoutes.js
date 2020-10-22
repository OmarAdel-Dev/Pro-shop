import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const router = express.Router();

// @desc    fetch all products
// @route   GET /api/products
// @access  PUBLIC
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

// @desc    fetch a single product
// @route   GET /api/product/:id
// @access  PUBLIC
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ msg: "Product not found" });
    }
  })
);

export default router;
