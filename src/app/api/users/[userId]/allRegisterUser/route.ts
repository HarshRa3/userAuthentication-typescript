import ResponseMessages from "@/helper/ResponseMessage";
import { connectdb } from "@/helper/dbConnection";
import { registeredUserForCourse } from "@/models/users";
connectdb()
export const GET=async (requese,{params}:any)=>{
    const {userId}=params
    try {
       const allTaskOfSingleUser= await registeredUserForCourse.find({userId:userId})
       return ResponseMessages("Task getting successfully",allTaskOfSingleUser,true,200)
    } catch (error) {
        return ResponseMessages(`Error message is ${error} `, null, false, 500);
    }
}