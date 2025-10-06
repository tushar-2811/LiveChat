import { createClient, type RedisClientType } from "redis";

class RedisConnection{
    private static instance: RedisConnection;
    private client: RedisClientType;

    private constructor(){
        this.client = createClient({
            url : process.env.REDIS_URL as string
        });

        this.client.on('connect' , () => console.log('Redis Connected'));
        this.client.on('error' , (err) => console.log("Redis Error" , err));
    }


    public static getInstance():RedisConnection{
        if(!RedisConnection.instance){
            RedisConnection.instance = new RedisConnection();
        }
        return RedisConnection.instance;
    }

    public async connect(): Promise<void>{
        await this.client.connect();
    }

    public getClient(): RedisClientType{
        return this.client;
    }
}

export default RedisConnection;

