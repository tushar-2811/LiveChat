import { type RedisClientType } from "redis";
declare class RedisConnection {
    private static instance;
    private client;
    private constructor();
    static getInstance(): RedisConnection;
    connect(): Promise<void>;
    getClient(): RedisClientType;
}
export default RedisConnection;
//# sourceMappingURL=redis.d.ts.map