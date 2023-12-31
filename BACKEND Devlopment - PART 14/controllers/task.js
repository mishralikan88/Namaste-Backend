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
  task.isCompleted = !task.isCompleted;
  await task.save();
  res.status(200).json({
    Message: "Task updated",
  });
};

export const deleteTask = async (req, res,next) => {
  const task = await Task.findById(req.params.id);
  if (!task) return next(new Error("Invalid ID"));
  await task.deleteOne();
  // next() is used on the last handler of the handler chain in updateTasks of task.js routes.we dont have any handler after that.
  // Once this next() is called, error will be thrown,thus we are passing error object inside next() to trigger that action.
  // To handle the error we use error middleware given by node at the end of root js file -  app.js.
 
  res.status(200).json({
    Message: "Task deleted",
  });
};
