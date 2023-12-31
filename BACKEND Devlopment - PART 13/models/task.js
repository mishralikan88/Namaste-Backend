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
  isCompleted: { // checkbox . checked as true , unchecked as false
    type: Boolean,
    default: false,
  },
  user: {
    type:String,//mongoose.schema.types.ObjectId, 
    ref: "User", // collection reference used in user.js of models folder
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Task = mongoose.model("Task", schema);
