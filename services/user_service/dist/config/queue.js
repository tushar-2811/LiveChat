import ampq from 'amqplib';
let channel;
export const connectRabbitMQ = async () => {
    try {
        const connection = await ampq.connect({
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
export const publishToQueue = async (queueName, message) => {
    if (!channel) {
        console.log("Channel is not initialized");
        return;
    }
    ;
    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
        persistent: true
    });
};
//# sourceMappingURL=queue.js.map