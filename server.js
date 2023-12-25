const express = require("express");
const connectDB = require("./config/dbConnection");
const orderRouter = require("./routes/orderRoute");
const userRouter = require("./routes/userRoute");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.options("*", cors());
app.use(
  cors({
    origin:
      "https://65898d35e2582cef59e19c72--astounding-sundae-81d624.netlify.app/",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/order", orderRouter);
app.use("/api/user", userRouter);
app.use(errorHandler);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
});
