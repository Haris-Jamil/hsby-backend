const mongoose = require("mongoose");
const shipperSchema = require("./shipperModel");
const consigneeSchema = require("./consigneeModel");
const shipmentSchema = require("./shipmentModel");

const orderSchema = mongoose.Schema(
  {
    id: mongoose.Schema.Types.ObjectId,
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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    collation: { locale: "en", strength: 2 },
  }
);

module.exports = mongoose.model("Order", orderSchema);
