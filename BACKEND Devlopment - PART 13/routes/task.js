import express from "express";
import { deleteTask, getMytasks, newTask, updateTasks } from "../controllers/task.js";
import { isAUthenticated } from "../middlewares/auth.js";

const taskrouter = express.Router();

taskrouter.post("/new", isAUthenticated, newTask); // login user should only add task .He has to be autheticated first.

taskrouter.get("/mytasks", isAUthenticated, getMytasks); // get user Tasks

taskrouter.route("/:id").put(isAUthenticated,updateTasks).delete(isAUthenticated,deleteTask)

export default taskrouter;
