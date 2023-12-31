import mongoose from "mongoose";

// Schema constructing

const schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// DB Model creating

export const User = mongoose.model("User", schema);
