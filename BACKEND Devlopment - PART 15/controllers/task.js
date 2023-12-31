import { Task } from "../models/task.js";

// CRUD In Action

// Create Task
export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const task = await Task.create({
      title,
      description,
      user: req.user._id,
    });
    res.status(201).json({
      success: true,
      message: "Task added successfully",
    });
  } catch (error) {
    next(error);
  }
};
// Read Task
export const getMytasks = async (req, res) => {
  try {
    const userID = req.user._id.toString();
    const tasks = await Task.find({ user: userID });
    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};
// Update Task
export const updateTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return next(new Error("Nice"));
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(200).json({
      Message: "Task updated",
    });
  } catch (error) {
    next(error);
  }
};
// Delete Task
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new Error("Invalid ID"));
    await task.deleteOne();
    res.status(200).json({
      Message: "Task deleted",
    });
  } catch (error) {
    next(error);
  }
};
