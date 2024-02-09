import { NextRequest } from "next/server";
import ResponseMessages from "@/helper/ResponseMessage";
import { User } from "@/models/user";
import { connectdb } from "@/helper/dbConnection";
import { genSaltSync, hashSync } from "bcrypt-ts";
connectdb();
const salt = genSaltSync(10);
export const POST = async (request: NextRequest) => {
  const { name, email, password, Confirm_password, role } =
    await request.json();
  try {
    if (!name || !email || !password || !Confirm_password || !role) {
      return ResponseMessages("All feild should be fullFill", null, false, 500);
    }
    if (password !== Confirm_password) {
      return ResponseMessages(
        "Password and confirm Password is not matched",
        null,
        false,
        500
      );
    }
    const user = await User.findOne({ email: email });
    if (user) {
      return ResponseMessages(
        "Email already exist please login",
        null,
        false,
        409
      );
    }

    const newUser = await User.create({ name, email, password:hashSync(password, salt), role });
    return ResponseMessages(
      "User Register has been succesfully",
      null,
      true,
      200
    );
  } catch (error) {
    return ResponseMessages("Server Error", null, false, 500);
  }
};
