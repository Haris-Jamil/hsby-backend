const mongoose = require("mongoose");

const shipmentSchema = mongoose.Schema({
  item_detail: String,
  special_instruction: String,
  weight: String,
  no_of_pieces: Number,
  cod_amount: Number,
});

module.exports = shipmentSchema;
