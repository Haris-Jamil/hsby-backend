const asyncHandler = require("express-async-handler");
const orderModel = require("../models/orderModel");
const trackHistoryModel = require("../models/trackHistoryModel");
const { order_status, monthLetter } = require("../constants");

const createOrder = asyncHandler(async (req, res) => {
  const order = req.body;
  order.trackingId = await getTrackingId();
  order.userId = req.user.id;
  const createdOrder = await orderModel.create(order);
  if (createOrder) {
    const trackHistory = {
      trackingId: order.trackingId,
      date: order.date,
      time: order.orderTime,
      status: order.status,
    };
    await trackHistoryModel.create(trackHistory);
  }
  res.status(200).json(createdOrder);
});

const saveOrder = asyncHandler(async (req, res) => {
  const { _id, orderTime, date, ...order } = req.body;
  const originalOrder = await orderModel.findById(_id);
  const response = await orderModel.findOneAndUpdate({ _id }, order);
  if (originalOrder.status !== order.status) {
    if (response) {
      const trackHistory = {
        trackingId: order.trackingId,
        date: date,
        time: orderTime,
        status: order.status,
      };
      const history = await trackHistoryModel.create(trackHistory);
      res.status(200).json(history);
    }
  } else {
    res.status(200).json(response);
  }
});

const getOrder = asyncHandler(async (req, res) => {
  const order = await orderModel.findById(req.params.id);
  res.status(200).json(order);
});

const getFilteredOrders = asyncHandler(async (req, res) => {
  let orders = await orderModel.find(req.body).populate("userId").lean();
  orders = orders.map((order) => {
    delete order["userId"].password;
    return order;
  });
  res.status(200).json(orders);
});

const getOrderByTrackingId = asyncHandler(async (req, res) => {
  const order = await orderModel
    .find({ trackingId: req.params.trackingId })
    .lean();
  const history = await trackHistoryModel.find({
    trackingId: req.params.trackingId,
  });
  order[0].history = history;
  res.status(200).json(order);
});

const deleteOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const response = await orderModel.findOneAndDelete({ _id: orderId });
  res.status(200).json(response);
});

const orderStatusCount = asyncHandler(async (req, res) => {
  const count = {};
  const userId = req.params.userId;
  for (let i = 0; i < order_status.length; i++) {
    const status = order_status[i];
    const searchFilter = {
      status: status,
    };
    if (userId) {
      searchFilter["userId"] = userId;
    }
    count[status] = await orderModel.countDocuments(searchFilter);
  }
  res.status(200).json(count);
});

const getTrackingId = asyncHandler(async () => {
  let newTrackingId = "";
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
  deleteOrder,
  orderStatusCount,
};
