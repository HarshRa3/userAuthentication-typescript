import { instance } from "@/helper/Instance"
export const SignUpService= async (user:any)=>{
    try {
        const users=await instance.post('api/users',user)
        return users
    } catch (error) {
           return error
           
    }
}