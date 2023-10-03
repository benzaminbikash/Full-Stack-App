const userModel = require("../model/userModel");
const { asyncHandler } = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1];

    try {
      if (token) {
        const { id } = jwt.verify(token, process.env.SECRET);
        req.user = await userModel.findById(id);
        next();
      }
    } catch (error) {
      throw new Error("Not Authorized User.");
    }
  }
  if (!token) {
    throw new Error("Token is not available");
  }
});
module.exports = { authMiddleware };
