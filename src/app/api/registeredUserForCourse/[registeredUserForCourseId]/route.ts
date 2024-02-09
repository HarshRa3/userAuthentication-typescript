import ResponseMessages from "@/helper/ResponseMessage";
import { connectdb } from "@/helper/dbConnection";
import { registeredUserForCourse } from "@/models/users";
import { NextRequest } from "next/server";
connectdb();
export const GET = async (request: NextRequest, { params }: any) => {
  const {registeredUserForCourseId} = params;
  
  try {
    const singleTask = await registeredUserForCourse.findById(registeredUserForCourseId);
    return ResponseMessages(
      `Getting single data is succesfully `,
      singleTask,
      true,
      200
    );
  } catch (error) {
    return ResponseMessages(`Error message is ${error} `, null, false, 500);
  }
};
export const PUT = async (request: NextRequest, { params }: any) => {
  const { registeredUserForCourseId } = params;
  const { username, email, course } = await request.json();
  try {
    const user = await registeredUserForCourse.findOne({ email: email });
    if(user){
      return ResponseMessages(
        "Email already exist",
        null,
        false,
        409
      );
    }
    const UpdatedData = await registeredUserForCourse.findByIdAndUpdate(
      registeredUserForCourseId,
      { username, email, course },
      { new: true }
    );
    return ResponseMessages(
      `Task has been updated successfully`,
      UpdatedData,
      true,
      200
    );
  } catch (error) {
    return ResponseMessages(`Error message is ${error} `, null, false, 500);
  }
};
export const DELETE = async (request: NextRequest, { params }: any) => {
  const { registeredUserForCourseId } = params;
  try {
    await registeredUserForCourse.deleteOne({ _id: registeredUserForCourseId });
    return ResponseMessages("Task Has been deleted", null, true, 200);
  } catch (error) {
    return ResponseMessages(`Error message is ${error} `, null, false, 500);
  }
};
