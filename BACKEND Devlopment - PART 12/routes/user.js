import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserByID,
  register,
  updateUser,
} from "../controllers/user.js";

const userRouter = express.Router(); // creating a user router

userRouter.get("/all", getAllUsers); // READ USERS API , /users/all -> Full Route

userRouter.post("/new", register); // CREATE/REGISTER USER API

// userRouter.route("/userid/:id")
//   .get(getUserByID)       // GET user by ID
//   .put(updateUser)        // Update user by ID
//   .delete(deleteUser);    // Delete user by ID
// Above is method chaining - Same as defining the three routes separately below.

userRouter.get("/userid/:id", getUserByID);     // GET user by ID
userRouter.put("/userid/:id", updateUser);      // Update user by ID
userRouter.delete("/userid/:id", deleteUser);   // Delete user by ID

export default userRouter; // exporting the user router
