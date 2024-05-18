import mongoose from "mongoose"
export const connectdb=async()=>{
    try {
       await mongoose.connect(process.env.BASE_URL!,{
            dbName:'Dashboard'
        })
        console.log('Database has been connected successfully');
    } catch (error) {
        console.log("Error while connecting to the database");
        console.log(error);
    }
}