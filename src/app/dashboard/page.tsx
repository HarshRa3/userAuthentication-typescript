import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { FaUser, FaUsers } from "react-icons/fa6";
import { RiAdminFill, RiUserAddFill } from "react-icons/ri";

// Define DirectionType
type DirectionType = {
  xs?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  sm?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  md?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  lg?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  xl?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  xxl?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
};

const Details = [
  {
    title: "Profile",
    summary: "Here Admin get their own information",
    logo: <FaUser size={"2rem"} />,
  },
  {
    title: "Users Data",
    summary:
      "Here we display the information of all the users data that stored in database",
    logo: <FaUsers size={"2rem"} />,
  },
  {
    title: "Add Users",
    summary: "Here we add the new user details and will be stored in database",
    logo: <RiUserAddFill size={"2rem"} />,
  },
  {
    title: "Admins Data",
    summary:
      "Here we display the information of all the admins data that stored in database",
    logo: <RiAdminFill size={"2rem"} />,
  },
];

const Page = () => {
  return (
    <>
      <Stack spacing={{xs:10,lg:25}} sx={{ alignItems:'center', color:'#f0f0f0c2' }}>
        <Stack spacing={2} sx={{ width:{xs:'50%',lg:'35%'}, textAlign:'center' }}>
          <Box>
            <Typography variant="h4">Admin and User information in one place</Typography>
          </Box>
          <Box>
            <Typography>Simple and intuitive admin panel that consolidates all admins and
              users information into a safe and centralized information store that
              is accessible from anywhere. All your employee's data can easily be
              collected, imported, and stored in the database.</Typography>
          </Box>
        </Stack>
        <Stack direction={{ xs:'column', lg:'row' }} spacing={2}>
          {Details.map((e, i) => (
            <div className="flex flex-col justify-center items-center m-10" key={i}>
              <div>{e.logo}</div>
              <h1 className="text-inherit text-2xl font-semibold">{e.title}</h1>
              <p className="text-center text-inherit pt-2">{e.summary}</p>
            </div>
          ))}
        </Stack>
      </Stack>
    </>
  );
}

export default Page;
