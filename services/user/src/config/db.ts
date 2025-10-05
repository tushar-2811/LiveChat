import mongoose from 'mongoose';

class MongoDB {
  private static isConnected = false;

  private constructor() {}

  public static async connect(): Promise<void> {
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
    } catch (error) {
      console.error('❌ Failed to connect to MongoDB:', error);
      process.exit(1);
    }
  }

  public static getConnection() {
    return mongoose.connection;
  }
}

export default MongoDB;
