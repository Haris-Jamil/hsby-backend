const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const dbConnection = await mongoose.connect(
      process.env.MONGO_CONNECTION_PATH
    );
    console.log(
      `Database connected: ${dbConnection.connection.host}, ${dbConnection.connection.name}`
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
