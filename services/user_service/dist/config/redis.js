import { createClient } from "redis";
class RedisConnection {
    constructor() {
        this.client = createClient({
            url: process.env.REDIS_URL
        });
        this.client.on('connect', () => console.log('Redis Connected'));
        this.client.on('error', (err) => console.log("Redis Error", err));
    }
    static getInstance() {
        if (!RedisConnection.instance) {
            RedisConnection.instance = new RedisConnection();
        }
        return RedisConnection.instance;
    }
    async connect() {
        await this.client.connect();
    }
    getClient() {
        return this.client;
    }
}
export default RedisConnection;
//# sourceMappingURL=redis.js.map