const mongoose = require("mongoose");

const consigneeSchema = mongoose.Schema({
  name: String,
  phone: String,
  city: String,
  address: String,
  email: String,
});

module.exports = consigneeSchema;
