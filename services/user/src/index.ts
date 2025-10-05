import express from "express"
import dotenv from 'dotenv'
import RedisConnection from "./config/redis.js";
import MongoDB from "./config/db.js";
import UserRouter from "./routes/user.routes.js";
import {connectRabbitMQ} from "./config/queue.js";

dotenv.config();

const startServer = async () => {
    await MongoDB.connect();
    const db = MongoDB.getConnection();
    console.log("db state :", db.readyState);

    const redisConnection = RedisConnection.getInstance();
    redisConnection.connect();

    connectRabbitMQ();

    const app = express();
    const port = process.env.PORT;


    app.use('/api/v1' , UserRouter);

    app.listen(port, () => {
        console.log("server is running on port", port);
    })

}

startServer();