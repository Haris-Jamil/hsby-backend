const mongoose = require("mongoose");
const shipperSchema = require("./shipperModel");
const consigneeSchema = require("./consigneeModel");
const shipmentSchema = require("./shipmentModel");

const orderSchema = mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    date: String,
    deliveryDate: String,
    deliveryCharges: Number,
    orderTime: String,
    status: String,
    trackingId: String,
    serviceType: String,
    shipper: shipperSchema,
    consignee: consigneeSchema,
    shipment: shipmentSchema,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
