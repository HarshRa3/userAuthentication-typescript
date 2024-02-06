import Navbar from "@/components/dashboard/Navbar/Navbar";
import React from "react";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (<Navbar pages={children}/>  );
}
