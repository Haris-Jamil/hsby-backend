const express = require("express");
const {
  registerUser,
  loginUser,
  getCurrentUser,
} = require("../controllers/userController");
const validateToken = require("../middlewares/validateTokenHandler");

const userRouter = express.Router();

userRouter.post("/create", validateToken, registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/currentUser", validateToken, getCurrentUser);

module.exports = userRouter;
