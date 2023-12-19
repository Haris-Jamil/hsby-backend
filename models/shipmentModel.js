const mongoose = require("mongoose");

const shipmentSchema = mongoose.Schema({
  itemDetail: String,
  specialInstruction: String,
  weight: String,
  noOfPieces: Number,
  codAmount: Number,
});

module.exports = shipmentSchema;
