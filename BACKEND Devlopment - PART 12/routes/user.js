import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserByID,
  register,
  updateUser,
} from "../controllers/user.js";

const userRouter = express.Router(); // creating a user router

userRouter.get("/all", getAllUsers); // READ USERS API

userRouter.post("/new", register); // CREATE/REGISTER USER API

// userRouter.route("/userid/:id").get(getUserByID).put(updateUser).delete(deleteUser) // similar to below 3 lines.Routing Method chaining.

userRouter.get("/userid/:id", getUserByID); // GET USER ID API

userRouter.put("/userid/:id", updateUser); // Update USER API

userRouter.delete("/userid/:id", deleteUser); // Delete USER API

export default userRouter; // exporting the user router
