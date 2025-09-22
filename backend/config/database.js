import mongoose from "mongoose";

export const dbConnect = async()=>{
    mongoose.connect(process.env.DB_URL)
    .then(()=>console.log("DB Connection is successful"))
    .catch((error)=>{
        console.log("DB Connection failed : ",error)
        process.exit(1)
    })
}