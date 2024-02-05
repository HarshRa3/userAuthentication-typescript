import ResponseMessages from "@/helper/ResponseMessage";
import { User } from "@/models/user";
import { compareSync } from "bcrypt-ts";
import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";
export const POST=async (request:NextRequest)=>{
    // 1. Get the data from the form
    const {email,password}= await request.json()
    try {
     
    //2. Check if all fields are filled in
    if(!email || !password){
        return ResponseMessages("All feild should be fullFill", null, false, 500);
    }
    //3. Validate email
    let validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    if (!validEmail) {
        return ResponseMessages('Please enter a valid email address',null ,false,400)
      }
    
    //4. check password length
    if(password.length <8 )
    {
        return ResponseMessages(`Password must contain at least 8 characters`,null,false,400)
    }
    const user=await User.findOne({email})
    if(!user){
        return  ResponseMessages("User not found!",null,false,400)
    }
    const bcryptPassword=compareSync(password,user.password)
    if(!bcryptPassword){
        return ResponseMessages("Incorrect Password!",null,false,400)
    } 
    const Authentication=jwt.sign({id:user.id,email:user.email},`${process.env.SECRET_KEY}`);
    cookies().set('token',Authentication)
    return ResponseMessages('Login SuccessFully',{token:Authentication,role:user.role},true,200)
    } catch (error) {
        return ResponseMessages('Internal server Error',null,false,500)   
    }
}