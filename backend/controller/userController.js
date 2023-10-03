const userModel = require("../model/userModel");
const { asyncHandler } = require("../utils/asyncHandler");
const { generateToken } = require("../utils/jwtToken");
const bcrypt = require("bcrypt");
//create user
const createUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (user) throw new Error("Email is already exit.");
  const data = await userModel.create(req.body);
  await data.save();
  res.status(200).json({
    status: true,
    message: "Registration Successfully!",
    data: data,
  });
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!email || !password) {
    throw new Error("Email and Password is required.");
  } else {
    if (user && (await user.isPasswordMatch(password))) {
      const token = generateToken(user._id);
      res.status(200).json({
        status: true,
        message: "Login Successfully!",
        token: token,
        user,
      });
    } else {
      throw new Error("Email or Password is incorrect.");
    }
  }
});
const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { name } = req.body;
  const user = await userModel.findByIdAndUpdate(_id, {
    $set: {
      name: name,
    },
  });
  res.status(200).json({
    status: true,
    message: "Update Successfully!",
    user,
  });
});
module.exports = { createUser, loginUser, updateUser };
