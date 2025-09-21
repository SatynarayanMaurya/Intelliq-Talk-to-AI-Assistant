import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
dotenv.config();

const port = process.env.PORT || 4000


const app = express();


app.use(express.json())


app.get("/",(_,res)=>{
    res.send(`<h1>Hi Intelliq AI Chatbat this side</h1>`)
})

app.listen(port,()=>{
    console.log("APP is running")
})