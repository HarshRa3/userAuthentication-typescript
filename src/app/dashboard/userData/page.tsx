import MRT_Table from '@/components/dashboard/MaterialReactTable/MRT_Table'
import { Stack } from '@mui/material'
import React from 'react'

const page = () => {
  
  return (<Stack sx={{width:"100%",justifyContent:'center',alignItems:'center'}}><Stack sx={{ width:'80%'}}><MRT_Table/></Stack></Stack>)
}

export default page
