import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export function middleware(request: any) {
  const url = request.nextUrl.clone();
  const token = cookies();
  const islogin = token.get("token");
  if (!islogin) {
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/", request.url));
    } else if (request.nextUrl.pathname.startsWith("/user-dashboard")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else if (islogin) {
    const tokenDetails = islogin.value;
    const decodeToken = jwtDecode(tokenDetails);
    const { role }: any = decodeToken;
    if (role === "Admin") {
      if (url.pathname === "/") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } else if (url.pathname === "/register") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } else if (url.pathname === "/forgotPassword") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }else if (url.pathname === "/user-dashboard") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }else{
      if (url.pathname === "/") {
        return NextResponse.redirect(new URL("/user-dashboard", request.url));
      } else if (url.pathname === "/register") {
        return NextResponse.redirect(new URL("/user-dashboard", request.url));
      } else if (url.pathname === "/forgotPassword") {
        return NextResponse.redirect(new URL("/user-dashboard", request.url));
      }else if (url.pathname === "/dashboard") {
        return NextResponse.redirect(new URL("/user-dashboard", request.url));
      }
    } 
  }
}