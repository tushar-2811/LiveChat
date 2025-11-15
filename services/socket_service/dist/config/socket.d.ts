import { Socket } from "socket.io";
import http from 'http';
export declare const getRecieverSocketId: (recieverId: string) => string | undefined;
export declare class SocketManager {
    private static instance;
    private io;
    private constructor();
    static getInstance(server: http.Server): SocketManager;
    private initializeEvents;
    private registerDefaultHandlers;
    getSocket(socketId: any): Socket<import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, any> | undefined;
    emitToRoom(roomId: string, event: string, payload: any): void;
}
//# sourceMappingURL=socket.d.ts.map