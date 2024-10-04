import express from "express"
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";
import cros from "cors";
import userRoute from "./routes/user.route.js"
import messageRoute  from "./routes/message.route.js"
import {app, server} from "./SocketIO/server.js"

// const app = express();
dotenv.config();
app.use(express.json()); // Add this middleware
app.use(cros());
app.use(cookieParser());


 const PORT = process.env.PORT || 4000;

const URI = process.env.MONGODB_URI;

try {
    mongoose.connect(URI);
   console.log("MongDB connected")
    
} catch (error) {
    console.log(error)
    
}
//middellware
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);



// ....code for deployement .......

    if(process.env.NODE_ENV === "production"){
        const dirPath = path.resolve();
        app.use(express.static("./Frontend/dist"));

        app.get('*',(req, res)=>{
            res.sendFile(path.resolve(dirPath, './Frontend/dist', 'index.html'));
        })
    }

 server.listen(PORT,()=>{
    console.log(`Server is runnig  on port ${PORT}`)
 })

//  app.listen(PORT,()=>{
//     console.log(`Server is runnig  on port ${PORT}`)
//  })