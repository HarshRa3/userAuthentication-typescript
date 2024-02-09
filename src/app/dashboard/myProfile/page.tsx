import MyProfile from '@/components/dashboard/MyProfile/MyProfile'
import { cookies } from 'next/headers'
import React from 'react'
interface TokenProps {
  name: string;
  value: string;
}

const page = () => {
  const token:any=cookies().get('token')
  return (<MyProfile token={token}/>)
}

export default page
