const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim:true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim:true
    },
    password: {
      type: String,
      required: [true, "Password is required"],
 
    },
    role:{
      type:String,
      default:"user"
    }
  },
  {
    timestamps: true,
  }
);

userScheme.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  else{
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  }
});
userScheme.methods.isPasswordMatch = async function (enterPassword) {
  return bcrypt.compare(enterPassword, this.password);
};
module.exports = mongoose.model("User", userScheme);
