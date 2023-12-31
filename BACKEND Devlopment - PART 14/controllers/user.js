import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendcookie } from "../utils/features.js";

export const getAllUsers = async (req, res) => {};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    res.status(404).json({
      success: false,
      message: "Invalid Email or password",
    });
  } else {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(404).json({
        success: false,
        message: "Invalid Email or password",
      });
    } else {
      sendcookie(user, res, `Welcome back ${user.name}`, 200);
    }
  }
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    res.status(404).json({
      success: false,
      message: "User Already Exist",
    });
  } else {
    const hassedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hassedPassword });
    sendcookie(user, res, "registered Successfully", 201);
  }
};

export const getMyProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", { expires: new Date(Date.now()) })
    .json({
      message: "You have successfully Logged out",
      user: req.user,
    });
};
