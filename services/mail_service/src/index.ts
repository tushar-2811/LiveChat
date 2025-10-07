import express from "express"
import dotenv from 'dotenv'
import { connectRabbitMQ, consumeFromQueue } from "./config/rabbitMQ.js";

dotenv.config();

const startServer = async () => {

    const app = express();
    const port = process.env.PORT;

    await connectRabbitMQ();
    await consumeFromQueue(process.env.RABBIT_MQ_QUEUE_NAME  as string);

    app.listen(port, () => {
        console.log("Mail Service is running on port", port);
    })

}

startServer();