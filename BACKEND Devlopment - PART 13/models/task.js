import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isCompleted: {    // Task Status / Checkbox =  true if checked, false if unchecked.
    type: Boolean,
    default: false, // By default, the checkbox is unchecked when a task is added; it can be used for selecting and deleting the task.

  },
  user: {
    type:String,    // Should be mongoose.Schema.Types.ObjectId for referencing a document. 
    ref: "User",    // "User" = model name from mongoose.model("User", schema)
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Task = mongoose.model("Task", schema);
