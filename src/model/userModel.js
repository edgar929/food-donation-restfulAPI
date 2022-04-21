import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";
require("dotenv").config();
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    minlength: 6,
    required: true,
  },
  profilePicture: {
    type: String,
    default: "https://res.cloudinary.com/dr4j1ymco/image/upload/v1650204803/dummy-pictures/avatar_i8dbaq.png",
  },
  token: {
    type: String,
  },

  role: {
    type: String,
    required: true,
  },
});
//generating auth token
userSchema.methods.generateAuthToken = async function(){
  const user = this
  const token = jwt.sign({_id:user._id.toString()}, 'mynameisedgarilovecoding')

  user.token = token
  await user.save()
  return token
}
//find if email and password are exists
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("user not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("password is incorrect");
  }
  return user;
};
//hash the plain text password
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("user", userSchema);
module.exports = User;
