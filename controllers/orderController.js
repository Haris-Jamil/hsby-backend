const asyncHandler = require("express-async-handler");
const orderModel = require("../models/orderModel");

const createOrder = asyncHandler(async (req, res) => {
  const order = req.body;
  order.trackingId = await getTrackingId();
  const createdOrder = await orderModel.create(order);
  res.status(200).json(createdOrder);
});

const saveOrder = asyncHandler(async (req, res) => {
  const order = req.body;
  const response = await orderModel.updateOne(order);
  res.status(200).json(response);
});

const getOrder = asyncHandler(async (req, res) => {
  const order = await orderModel.findById(req.params.id);
  res.status(200).json(order);
});

const getFilteredOrders = asyncHandler(async (req, res) => {
  console.log(req.body);
  const orders = await orderModel.find(req.body);
  res.status(200).json(orders);
});

const getOrderByTrackingId = asyncHandler(async (req, res) => {
  console.log("req.params.trackingId", req.params.trackingId);
  const order = await orderModel.find({ trackingId: req.params.trackingId });
  res.status(200).json(order);
});

const getTrackingId = asyncHandler(async () => {
  let newTrackingId = "";
  const monthLetter = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "M",
  ];
  const currentDate = new Date();

  newTrackingId += currentDate.getFullYear().toString().slice(-2);
  newTrackingId += monthLetter[currentDate.getMonth()];
  newTrackingId += currentDate.getDate().toString();

  const lastOrder = await orderModel.find().sort({ _id: -1 }).limit(1);
  let lastTrackingNumber = 0;
  if (lastOrder.length === 1) {
    lastTrackingNumber = Number(lastOrder[0].trackingId.slice(-8));
  }
  lastTrackingNumber = (++lastTrackingNumber).toString().padStart(8, "0");
  return newTrackingId + lastTrackingNumber;
});

module.exports = {
  createOrder,
  getOrder,
  getFilteredOrders,
  getOrderByTrackingId,
  saveOrder,
};
