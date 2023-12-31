import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {
  const { title, description } = req.body;

  const task = await Task.create({
    title,
    description,
    user: req.user._id, // object auto converted to string
  });
  res.status(201).json({
    success: true,
    message: "Task added successfully",
  });
};

export const getMytasks = async (req, res) => {
  const userID = req.user._id.toString();
  const tasks = await Task.find({ user: userID });
  res.status(200).json({
    success: true,
    tasks,
  });
};

export const updateTasks = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Invalid Id",
    });
  }
  task.isCompleted = !task.isCompleted;
  await task.save();
  res.status(200).json({
    Message: "Task updated",
  });
};

export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  await task.deleteOne();
  if (!task)
    return res.status(404).json({
      success: false,
      message: "Invalid Id",
    });
  res.status(200).json({
    Message: "Task deleted",
  });
};
