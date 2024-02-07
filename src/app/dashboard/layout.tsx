import Navbar from "@/components/dashboard/Navbar/Navbar";
import { cookies } from "next/headers";
import React from "react";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token:any=cookies().get('token')
  return (<Navbar pages={children} token={token?.value}/>  );
}
