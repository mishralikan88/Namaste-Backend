import express from "express";

import {
  getAllUsers,
  getMyProfile,
  login,
  logout,
  register,
} from "../controllers/user.js";
import { isAUthenticated } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.get("/all", getAllUsers);

userRouter.post("/new", register);

userRouter.get("/me", isAUthenticated, getMyProfile);

userRouter.post("/login", login);

userRouter.get("/logout", logout);

export default userRouter;
