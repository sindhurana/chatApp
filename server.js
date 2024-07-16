import http from "http";
import {Server} from "socket.io";
import express from "express"
import cors from "cors"
import { connectToMongoDB, getDB } from "./mongodb.js";
import ChatModel from "./chatModel.js";

const app=express();

const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin: "*",
        methods: ["GET","POST"],
        
      }
});

io.on("connection",(socket)=>{
    console.log("Connection established");

    socket.on("join",(userName)=>{
        socket.userName=userName;

    })


     
    socket.on("new_message",(message)=>{
        
        let userMessage={
            userName:socket.userName,message:message};

      const newChat=new ChatModel(socket.userName,message,new Date());

       const db=getDB();
       db.collection("chat").insertOne(newChat);
        socket.broadcast.emit("broadcast_message",userMessage);
    })

    

    socket.on("disconnect",()=>{
        console.log("Disconnected");
    })
})

server.listen(3100,()=>{
    console.log("Server running");
    connectToMongoDB();
})

