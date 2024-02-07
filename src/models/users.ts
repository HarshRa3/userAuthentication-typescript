import { File } from "buffer";
import { Schema } from "mongoose";

const usersScheema=new Schema({
    username:{
        type:String,
        require:true
    },
    email: {
        type: String,
        require: [true, "Please Enter Your Email"],
        unique: true,
      },
      course:{
        type:String,
        enum:['Mern Stack','Web Designing','Java Full Stack Dovelopment','Python Full Stack Dovelopment'],
        require:true,
      },
      date:{
        type:Date,
        require:true
      },
      description:{
        type:String,
        require:true
      },
      image:{
        type:File
      }

})