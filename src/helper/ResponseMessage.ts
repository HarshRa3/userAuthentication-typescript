import { NextResponse } from "next/server";
const ResponseMessages = (
  message: String,
  data: any,
  successStatus: boolean,
  statusCode: number
) => {
  return NextResponse.json(
    { message, data, success: successStatus },
    { status: statusCode }
  );
};
export default ResponseMessages;