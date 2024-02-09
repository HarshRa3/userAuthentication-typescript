import { instance } from "@/helper/Instance";

 const registeredUserForCourse=async(values:any)=>{
    try {
        const registeredUserForCourse=await instance.post('api/registeredUserForCourse',values)
        console.log(registeredUserForCourse,'sdfdsf');
      } catch (error) {
        console.log(error);
        
      }  
}
export default registeredUserForCourse