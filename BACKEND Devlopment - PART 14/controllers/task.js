import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {
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
  if (!task) return next(new Error("Nice"));
  task.isCompleted = !task.isCompleted; // Updating a task means toggling its completion status (checked/unchecked).
  await task.save();
  res.status(200).json({
    Message: "Task updated",
  });
};

export const deleteTask = async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (!task) return next(new Error("Invalid ID"));
  await task.deleteOne();
  res.status(200).json({
    Message: "Task deleted",
  });
};

// If no task is found, you call next(error) with an Error object (new Error("Invalid ID")). This skips the normal route flow and passes control to the next error-handling middleware.

// How it reaches the error middleware ? In app.js at the very bottom we have app.use(errorMiddleWare); This is a special Express middleware with four parameters (err, req, res, next).Express detects that it’s an error handler (because it has 4 args) and automatically sends any errors here.

// What the error middleware does ?

// export const errorMiddleWare = (err, req, res, next) => {
//   err.message = err.message || "Internal Server error"; // default error message if err.message is undefined.
//   res.status(404).json({
//     success: false,
//     message: err.message,
//   });
// };

// =============================================================================================================================

// Error Handling Flow -

// 1. Error occurs → call next(error).

// 2. Express skips normal routes and jumps to the error middleware.

// 3. Error middleware formats and sends the error response.
