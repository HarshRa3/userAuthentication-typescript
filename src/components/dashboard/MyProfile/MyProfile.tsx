import React from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { Box, Stack, Typography } from "@mui/material";

interface TokenProps {
  name: string;
  value: string;
}
interface CustomJwtPayload extends JwtPayload {
  email: string;
  role:string;
 }

const MyProfile: React.FC<{ token: TokenProps }> = ({ token }) => {
  const decode:CustomJwtPayload = jwtDecode(token.value);
  console.log(token);

  return (
    <Stack sx={{ color: "#f0f0f0c2" }}>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        My detail
      </Typography>
      <Stack direction={"row"} className="justify-between">
        <Stack>
          <Stack direction={"row"} spacing={1} sx={{ alignItems: "center" }}>
            {" "}
            <Typography variant="h6">ID:</Typography>
            <Box>{decode.iat}</Box>
          </Stack>
          <Stack direction={"row"} spacing={1} sx={{ alignItems: "center" }}>
            <Typography variant="h6">Email Id:</Typography>
            <Box>{decode.email}</Box>
          </Stack>
        </Stack>
        <Stack>{decode.role}</Stack>
      </Stack>
    </Stack>
  );
};

export default MyProfile;
