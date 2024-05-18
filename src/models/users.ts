import mongoose from "mongoose";
import { object } from "yup";

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true
  },
  course: {
    type: String,
    enum: ['Mern Stack', 'Web Designing', 'Java Full Stack Development', 'Python Full Stack Development'],
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  
});

export const registeredUserForCourse =
  mongoose.models.registeredUserForCourse || mongoose.model("registeredUserForCourse", usersSchema);
