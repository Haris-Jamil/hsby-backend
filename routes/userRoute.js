const express = require("express");
const {
  registerUser,
  loginUser,
  getCurrentUser,
  userLogout,
  getAllUsers,
  saveUser,
  deleteUser,
  changePassword,
} = require("../controllers/userController");
const validateToken = require("../middlewares/validateTokenHandler");
const validateAdmin = require("../middlewares/validateAdmin");

const userRouter = express.Router();

userRouter.post("/create", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/currentUser", validateToken, getCurrentUser);
userRouter.get("/logout", userLogout);
userRouter.get("/all", validateToken, validateAdmin, getAllUsers);
userRouter.post("/save", validateToken, validateAdmin, saveUser);
userRouter.get("/delete/:id", validateToken, validateAdmin, deleteUser);
userRouter.post("/setNewPassword", validateToken, changePassword);

module.exports = userRouter;
