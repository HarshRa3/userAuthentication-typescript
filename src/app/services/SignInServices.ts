import { instance } from "@/helper/Instance"

export const SignInService= async (user:any)=>{
    try {
        const users=await instance.post('api/signIn',user)
        return users
        
    } catch (error) {
        return error
        
    }
}