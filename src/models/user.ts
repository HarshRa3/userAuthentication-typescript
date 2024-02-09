import mongoose, { Schema } from "mongoose";
const userScheema = new Schema({
  name: String,
  email: {
    type: String,
    require: [true, "Please Enter Your Email"],
    unique: true,
  },
  password: { type: String, require: [true, "Please Provide a Password"] },
  Confirm_password: {
    type: String,
    require: [true, "Please Confirm Your Password"],
  },
  role:{
    type: String,  
    enum: ['User', 'Admin'],
    require:true
},
});
export const User =
  mongoose.models.users || mongoose.model("users", userScheema);
