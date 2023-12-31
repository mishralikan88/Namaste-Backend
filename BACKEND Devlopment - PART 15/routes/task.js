import express from "express";
import {
  deleteTask,
  getMytasks,
  newTask,
  updateTasks,
} from "../controllers/task.js";
import { isAUthenticated } from "../middlewares/auth.js";

const taskrouter = express.Router();

taskrouter.post("/new", isAUthenticated, newTask);

taskrouter.get("/mytasks", isAUthenticated, getMytasks);

taskrouter
  .route("/:id")
  .put(isAUthenticated, updateTasks)
  .delete(isAUthenticated, deleteTask);

export default taskrouter;
