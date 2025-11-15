import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
class MongoDB {
    constructor() { }
    static async connect() {
        if (this.isConnected) {
            console.log('🟢 MongoDB already connected');
            return;
        }
        const url = process.env.MONGO_URI;
        if (!url) {
            throw new Error('Mongo_URI is not defined in environment variables');
        }
        try {
            await mongoose.connect(url, {
                dbName: 'ChatAppMicroservices',
            });
            this.isConnected = true;
            console.log('✅ Connected to MongoDB');
        }
        catch (error) {
            console.error('❌ Failed to connect to MongoDB:', error);
            process.exit(1);
        }
    }
    static getConnection() {
        return mongoose.connection;
    }
}
MongoDB.isConnected = false;
export default MongoDB;
//# sourceMappingURL=db.js.map