import ResponseMessages from "@/helper/ResponseMessage";
import { connectdb } from "@/helper/dbConnection";
import { User } from "@/models/user";
import { NextRequest } from "next/server";

connectdb()
export const GET=async (request:NextRequest,{params}:{params:string})=>{
    console.log(params,'sfsdfdsfs');
    const {userId}:any=params
    try {
        const singleUser=await User.findById(userId)
        console.log(singleUser);
        return ResponseMessages('Getting Single User Successfully',singleUser,true,200)
        
        
    } catch (error) {
        return ResponseMessages(`The Error is ${error}`,null,false,400)
    }
}