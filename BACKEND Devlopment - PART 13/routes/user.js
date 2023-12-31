import express from "express";

import {
  getAllUsers,
  getMyProfile,
  login,
  logout,
  register,
} from "../controllers/user.js";
import { isAUthenticated } from "../middlewares/auth.js";

const userRouter = express.Router(); // creating a user router

userRouter.get("/all", getAllUsers); // READ USERS API



userRouter.post("/new", register); // CREATE/REGISTER USER API

userRouter.get("/me",isAUthenticated, getMyProfile); // GET USER ID API

userRouter.post("/login", login); // Login API

userRouter.get("/logout", logout); // GET USER ID API

export default userRouter; // exporting the user router
