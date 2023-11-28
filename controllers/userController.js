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
  console.log(hashedPassword);
  const createdUser = userModel.create({
    username,
    email,
    password: hashedPassword,
  });
  res.status(200).json(createdUser);
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
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
      { expiresIn: "1hr" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401).send("wrong email or password");
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  if (req.user) {
    res.status(200).json(req.user);
  }
});

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
};
