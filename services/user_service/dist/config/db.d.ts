import mongoose from 'mongoose';
declare class MongoDB {
    private static isConnected;
    private constructor();
    static connect(): Promise<void>;
    static getConnection(): mongoose.Connection;
}
export default MongoDB;
//# sourceMappingURL=db.d.ts.map