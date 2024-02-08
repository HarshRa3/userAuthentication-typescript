import ResponseMessages from "@/helper/ResponseMessage";
import { connectdb } from "@/helper/dbConnection";
import { registeredUserForCourse } from "@/models/users";
import { NextRequest } from "next/server";
connectdb();
export const GET = async (request: NextRequest, { params }: any) => {
  const { taskId } = params;
  try {
    const singleTask = await registeredUserForCourse.findById(taskId);
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
  const { taskId } = params;
  const { title, content, status } = await request.json();
  try {
    const UpdatedData = await registeredUserForCourse.findByIdAndUpdate(
      taskId,
      { title, content, status },
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
  const { userId } = params;
  try {
    await registeredUserForCourse.deleteOne({ _id: userId });
    return ResponseMessages("Task Has been deleted", null, true, 200);
  } catch (error) {
    return ResponseMessages(`Error message is ${error} `, null, false, 500);
  }
};
