import amqp from 'amqplib';
import dotenv from 'dotenv';
dotenv.config();
let channel;
export const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect({
            protocol: "amqp",
            hostname: process.env.RABBIT_MQ_HOST,
            port: 5672,
            username: process.env.RABBIT_MQ_USERNAME,
            password: process.env.RABBIT_MQ_PASSWORD
        });
        channel = await connection.createChannel();
        console.log("**Connected to RabbitMQ**");
    }
    catch (error) {
        console.log("Error while connecting to RabbitMQ", error);
    }
};
export const consumeFromQueue = async () => {
    try {
    }
    catch (error) {
        console.log("Failed to start RabbitMQ Consumer", error);
    }
};
//# sourceMappingURL=queue_consumer.js.map