import AddUserForm from '@/components/dashboard/AddUser/AddUserForm'
import React from 'react'

const page = ({params}:any) => {
  return (
<AddUserForm userId={params.addUser}/>
  )
}

export default page
