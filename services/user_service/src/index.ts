import express from "express"
import dotenv from 'dotenv'
import RedisConnection from "./config/redis.js";
import MongoDB from "./config/db.js";
import UserRouter from "./routes/user.routes.js";
import {connectRabbitMQ} from "./config/rabbitMQ.js";

dotenv.config();

const startServer = async () => {
    await MongoDB.connect();
    const db = MongoDB.getConnection();
    console.log("db state :", db.readyState);

    const redisInstance = RedisConnection.getInstance();
    redisInstance.connect();

    connectRabbitMQ();

    const app = express();
    const port = process.env.PORT;

    app.use(express.json());

    app.get('/health' , (req,res) =>{
        res.status(200).json({
            message : "eveything working fine"
        })
        return;
    })


    app.use('/api/v1' , UserRouter);

    app.listen(port, () => {
        console.log("server is running on port", port);
    })

}

startServer();