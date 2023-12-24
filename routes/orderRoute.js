const express = require("express");
const {
  createOrder,
  getOrder,
  getFilteredOrders,
  getOrderByTrackingId,
  saveOrder,
  deleteOrder,
  orderStatusCount,
} = require("../controllers/orderController");
const validateToken = require("../middlewares/validateTokenHandler");
const orderRouter = express.Router();

orderRouter.post("/create", validateToken, createOrder);
orderRouter.post("/saveOrder", validateToken, saveOrder);
orderRouter.get("/getOrder/:id", validateToken, getOrder);
orderRouter.post("/getOrders", validateToken, getFilteredOrders);
orderRouter.get(
  "/getOrderByTrackingId/:trackingId",
  validateToken,
  getOrderByTrackingId
);
orderRouter.get("/delete/:id", validateToken, deleteOrder);
orderRouter.get("/statusCount/", orderStatusCount);
orderRouter.get("/statusCount/:userId", orderStatusCount);
module.exports = orderRouter;
