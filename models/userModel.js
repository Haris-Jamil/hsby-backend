const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: String,
    password: String,
    email: String,
    address: String,
    company: String,
    phone: String,
    role: String,
    isActive: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
