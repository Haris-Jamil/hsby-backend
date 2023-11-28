const express = require("express");
const connectDB = require("./config/dbConnection");
const orderRouter = require("./routes/orderRoute");
const userRouter = require("./routes/userRoute");
const errorHandler = require("./middlewares/errorHandler");
// const validateToken = require("./middlewares/validateTokenHandler");

require("dotenv").config();

connectDB();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/order", orderRouter);
app.use("/api/user", userRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
