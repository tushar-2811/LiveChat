import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import MongoDB from './config/db.js';
import chatRouter from './routes/chat.js';
import { app, server } from './server.js';
import { SocketManager } from './config/socket.js';

dotenv.config();

const startServer = async () => {
   await MongoDB.connect();
   const db = MongoDB.getConnection();
   console.log("db state :", db.readyState);

   const port = process.env.PORT || 4005;
   
   app.use(cors());
   app.use(express.json());

   SocketManager.getInstance(server);

   app.use('/api/v1/chat',chatRouter);

   server.listen(port, () => {
      console.log("Socket Service is running on port :", port);
   })
}

startServer();