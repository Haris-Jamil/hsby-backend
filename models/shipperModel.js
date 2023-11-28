const mongoose = require("mongoose");

const shipperSchema = mongoose.Schema({
  name: String,
  phone: String,
  city: String,
  address: String,
  email: String,
  pickup_address: String,
});

module.exports = shipperSchema;
