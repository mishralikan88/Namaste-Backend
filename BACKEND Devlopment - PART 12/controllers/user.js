import { User } from "../models/user.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find({}).then();
  res.json({
    success: true,
    users,
  });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const users = await User.create({
    name,
    email,
    password,
  });
  res.status(201).json({
    success: true,
    message: "registered successfully",
  });
};

export const getUserByID = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json({
    success: true,
    user,
  });
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  // Add update Logic
  res.json({
    success: true,
    message: "Updated",
  });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  // await user.remove() // Add  delete logic
  res.json({
    success: true,
    message: "Deleted",
  });
};
