import amqp from 'amqplib';
import dotenv from 'dotenv';
import { sendOtpEmail } from '../service/mailService.js';
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
        console.log("**Connected to RabbitMQ for mail service**");
    }
    catch (error) {
        console.log("Error while connecting to RabbitMQ for mail service", error);
    }
};
export const consumeFromQueue = async (queueName) => {
    try {
        if (!channel) {
            console.log("Channel is not initialized");
            return;
        }
        await channel.assertQueue(queueName, { durable: true });
        console.log(`📩 Waiting for messages in queue: ${queueName}`);
        channel.consume(queueName, async (msg) => {
            if (msg) {
                const messageContent = msg.content.toString();
                console.log("Message Content", messageContent);
                try {
                    const { to, subject, body } = JSON.parse(messageContent);
                    const info = await sendOtpEmail(to, subject, body);
                    console.log("OTP send to ", to);
                    console.log("information about mail", info);
                    channel.ack(msg);
                }
                catch (error) {
                    console.log("Failed to send OTP", error);
                }
            }
        });
    }
    catch (error) {
        console.log("Failed to start RabbitMQ Consumer", error);
    }
};
//# sourceMappingURL=rabbitMQ.js.map