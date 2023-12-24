const mongoose = require("mongoose");

const trackHistorySchema = mongoose.Schema(
  {
    trackingId: String,
    date: String,
    time: String,
    status: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TrackHistory", trackHistorySchema);
