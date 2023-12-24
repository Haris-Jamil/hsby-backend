const asyncHandler = require("express-async-handler");

const validateAdmin = asyncHandler(async (req, res, next) => {
  if (req.user?.username !== "admin") {
    res.status(401);
    throw new Error("user not authorized");
  } else {
    next();
  }
});

module.exports = validateAdmin;
