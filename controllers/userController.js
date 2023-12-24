const userModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const emailAlreadyExist = await userModel.findOne({ email });
  if (emailAlreadyExist) {
    res.status(400);
    throw new Error("user with this email already exist");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const createdUser = await userModel.create({
    username,
    email,
    password: hashedPassword,
    role: "client",
    isActive: false,
  });

  if (createdUser._id) {
    res.status(200).json({ registered: true });
  } else {
    res.status(500).json({ registered: false });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    if (!user.isActive) {
      res.status(401).send("account not active");
    }
  }
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("hsby", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.status(200).json({ success: true });
  } else {
    res.status(401).send("wrong email or password");
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  if (req.user) {
    let user = await userModel.find({ _id: req.user.id }).lean();
    let { password, _id, ...restUser } = user[0];
    res.status(200).json({ ...restUser, id: _id });
  }
});

const userLogout = asyncHandler(async (req, res) => {
  res.cookie("hsby", "", {
    expires: new Date(0),
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.status(200).json({ success: true });
});

const getAllUsers = asyncHandler(async (req, res) => {
  let users = await userModel
    .find({ username: { $not: { $eq: "admin" } } })
    .lean();
  res.status(200).json(users);
});

const saveUser = asyncHandler(async (req, res) => {
  const { _id, ...user } = req.body;
  const response = await userModel.findOneAndUpdate({ _id }, user);
  res.status(200).json({ success: true });
});

const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const response = await userModel.findOneAndDelete({ _id: userId });
  res.status(200).json(response);
});

const changePassword = asyncHandler(async (req, res) => {
  const passData = req.body;
  const user = await userModel.find({ _id: req.user.id }).lean();
  const currentPasswordMatched = await bcrypt.compare(
    passData.currentPassword,
    user[0].password
  );
  if (currentPasswordMatched) {
    const hashedPassword = await bcrypt.hash(passData.newPassword, 10);
    const response = await userModel.findOneAndUpdate(
      { _id: req.user.id },
      { password: hashedPassword }
    );
    res.status(200).json({ success: true });
  }
  res.status(200).json({ success: false, msg: "wrong current password" });
});

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  userLogout,
  getAllUsers,
  saveUser,
  deleteUser,
  changePassword,
};
