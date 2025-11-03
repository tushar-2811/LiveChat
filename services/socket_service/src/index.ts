import express from 'express'
import dotenv from 'dotenv'
import MongoDB from './config/db.js';
import chatRouter from './routes/chat.js';

dotenv.config();

const startServer = async () => {
   console.log("hello")
   await MongoDB.connect();
   const db = MongoDB.getConnection();
   console.log("db state :", db.readyState);


   const app = express();
   const port = process.env.PORT || 4005;

   app.use(express.json());

   app.use('/api/v1/chat',chatRouter);

   app.listen(port, () => {
      console.log("Socket Service is running on port :", port);
   })
}

startServer();