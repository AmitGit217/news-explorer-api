import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";

const User = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 30 },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, "Email is invalid"],
  },
  password: {
    select: false,
    type: String,
    required: true,
  },
});

export default mongoose.model("user", User);
