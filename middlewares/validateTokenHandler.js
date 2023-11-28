const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const validateToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    const authToken = authHeader.split(" ")[1];

    if (!authToken) {
      res.status(401);
      throw new Error("auth token is missing");
    }

    jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
      if (err) {
        res.status(401);
        throw new Error("user is not authorized");
      }
      req.user = data;
      next();
    });
  } else {
    res.status(401);
    throw new Error("auth token is missing");
  }
});

module.exports = validateToken;
