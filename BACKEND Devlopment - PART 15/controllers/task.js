import CustomErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

// CRUD

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
    if (!task) return next(new CustomErrorHandler("Task Not Found", 404));
    await task.deleteOne();
    res.status(200).json({
      Message: "Task deleted",
    });
  } catch (error) {
    next(error);
  }
};



// How try–catch works in Express ?

// 1. Wrap route logic in a try block — this includes DB calls, API requests, or any code that might throw an error.

// 2. Express runs the code in try line by line.

// 3. If everything works, the request finishes normally, and the catch block is ignored.

// 4. If something fails (throws an error or rejects a promise), JavaScript stops the try block right there.

// 5. Control jumps into the catch block.

// 6. Inside catch, you can handle the error directly or pass it to your global error middleware using next(error).

// 7. Express then skips all remaining routes/middleware and jumps to your error-handling middleware, which sends the error response.