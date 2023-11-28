const mongoose = require("mongoose");
const shipperSchema = require("./shipperModel");
const consigneeSchema = require("./consigneeModel");
const shipmentSchema = require("./shipmentModel");

const orderSchema = mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    date: Date,
    delivery_date: Date,
    delivery_charges: Number,
    status: String,
    tracking_id: String,
    shipper: shipperSchema,
    consignee: consigneeSchema,
    shipment: shipmentSchema,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
