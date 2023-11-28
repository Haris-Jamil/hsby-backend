const { errorCodes } = require("../constants");

const errorHandler = (error, req, res, next) => {
  const errorType = res.statusCode ? res.statusCode : errorCodes.SERVER_ERROR;
  switch (errorType) {
    case errorCodes.BAD_REQEUST:
      res.json({
        title: "Bad Request",
        message: error.message,
      });
      break;
    case errorCodes.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: error.message,
      });
      break;
    case errorCodes.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: error.message,
      });
      break;
    case errorCodes.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: error.message,
      });
      break;
    case errorCodes.SERVER_ERROR:
      res.json({
        title: "Internal Server Error",
        message: error.message,
      });
      break;
    default:
      console.log(error);
  }
};

module.exports = errorHandler;
