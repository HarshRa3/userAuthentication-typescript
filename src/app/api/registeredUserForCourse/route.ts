import ResponseMessages from "@/helper/ResponseMessage";
import { connectdb } from "@/helper/dbConnection";
import { registeredUserForCourse } from "@/models/users";
import { NextRequest } from "next/server";

connectdb();
export const GET = async (request: NextRequest) => {
  let registeredUserForCourses = [];
  try {
    registeredUserForCourses = await registeredUserForCourse.find();
    return ResponseMessages(
      "Registerd User getting successfully",
      registeredUserForCourses,
      true,
      200
    );
  } catch (error) {
    return ResponseMessages(`Error message is ${error} `, null, false, 500);
  }
};
export const POST = async (request: NextRequest) => {
  const { username, email, course, userId, dateOfBirth, description, file } =
    await request.json();
  try {
    const user = await registeredUserForCourse.findOne({ email: email });
    if (user) {
      return ResponseMessages(
        "Email already exist please login",
        null,
        false,
        409
      );
    }

    await registeredUserForCourse.create({
      username,
      email,
      course,
      userId,
      dateOfBirth,
      description,
    });
    return ResponseMessages("User added SuccessFully", null, true, 200);
  } catch (error) {
    return ResponseMessages(`error is ${error}`, null, false, 500);
  }
};
