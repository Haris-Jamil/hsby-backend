const express = require("express");
const {
  registerUser,
  loginUser,
  getCurrentUser,
  userLogout,
} = require("../controllers/userController");
const validateToken = require("../middlewares/validateTokenHandler");

const userRouter = express.Router();

userRouter.post("/create", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/currentUser", validateToken, getCurrentUser);
userRouter.get("/logout", userLogout);

module.exports = userRouter;
