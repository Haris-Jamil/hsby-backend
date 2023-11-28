const asyncHandler = require("express-async-handler");
const orderModel = require("../models/orderModel");

const createOrder = asyncHandler(async (req, res) => {
  const order = req.body;
  const createdOrder = await orderModel.create(order);
  res.status(200).json(createdOrder);
});

module.exports = {
  createOrder,
};
