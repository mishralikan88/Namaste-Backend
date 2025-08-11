import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true, // Mandatory field
    unique: true,   // No duplicate emails allowed
  },
  password: {
    type: String,
    required: true,
    select: false, // by default, this field will not be returned in query results unless you explicitly request it.
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model("User", schema);

// password: {
//     type: String,
//     required: true,
//     select: false, // by default, this field will not be returned in query results unless you explicitly request it.
// },


// Example: Schema -

// password: {
//   type: String,
//   required: true,
//   select: false, // hide password by default
// }

// Query -

// const user = await User.findOne({ email: "abc@test.com" });
// console.log(user.password); // ❌ undefined

// If you explicitly include it

// const user = await User.findOne({ email: "abc@test.com" }).select("+password");
// console.log(user.password); // ✅ shows password

// One-liner - select: false hides the field from query results unless you manually include it with .select("+fieldName").