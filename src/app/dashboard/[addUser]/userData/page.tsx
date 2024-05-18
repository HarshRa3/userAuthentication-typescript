import { Stack } from "@mui/material";
import React from "react";
import ExampleWithProviders from "@/components/dashboard/MaterialReactTable/MRT_Table2";
const page = ({params}:any) => {
  
  return (
    <Stack
      sx={{ width: "100%", justifyContent: "center", alignItems: "center" }}
    >
      <Stack sx={{ width: "80%" }}>
        <ExampleWithProviders userID={params?.addUser}/>
      </Stack>
    </Stack>
  );
};

export default page;
