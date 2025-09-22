import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import { dbConnect } from "./config/database.js";
import routes from "./routes/route.js"
import fileUpload from "express-fileupload"
dotenv.config();
dbConnect()

const port = process.env.PORT || 4000


const app = express();
const allFrontendUrl = process.env.FRONTEND_URL?.split(",") || [];

app.use(cors({
    origin:(origin,callback)=>{
        if(!origin || allFrontendUrl.includes(origin)){
            callback(null,true)
        }
        else{
            callback( new Error("Origin Not allowed by cors"))
        }
    },
    credentials:true
}))


app.use(express.json())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.use(routes)


app.get("/",(_,res)=>{
    res.send(`<h1>Hi Intelliq AI Chatbot this side</h1>`)
})

app.listen(port,()=>{
    console.log("APP is running")
})