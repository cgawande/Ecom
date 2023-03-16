const jwt = require("jsonwebtoken");

const checkUserAuth = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (authorization) {
      const token = authorization.split(" ")[1];
      jwt.verify(token, process.env.SECRET_KEY);
      next();
    } else {
      res.status(401).json({
        success: "failure",
        message: "User not authorised or invalid token",
      });
    }
  } catch (err) {
    res.status(400).json({
      success: "failure",
      message: "Error occure" + err.message,
    });
  }
};

const isUser = async (req, res, next) => {
  let userRole = req.body.role;
  if (userRole) {
    if (userRole === "user") {
      next();
    } else {
      res.status(400).json({
        message: "Role is not user",
      });
    }
  } else {
    res.status(400).json({
      message: "User role is not present",
    });
  }
};

const isVendor = async (req, res, next) => {
  let vendorRole = req.body.role;
  if (vendorRole) {
    if (vendorRole === "vendor") {
      next();
    } else {
      res.status(400).json({
        message: "Its not vendor",
      });
    }
  } else {
    res.status(400).json({
      message: "vendor role is not present",
    });
  }
};

module.exports = {
  checkUserAuth,
  isUser,
  isVendor,
};
