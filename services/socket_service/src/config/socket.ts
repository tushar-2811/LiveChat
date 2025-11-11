import { Server, Socket } from "socket.io";
import http from 'http';

const userSocketMap: Record<string , string> = {};

export class SocketManager {
    private static instance: SocketManager;
    private io: Server;

    private constructor(server: http.Server) {
        this.io = new Server(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        });

        this.initializeEvents();
    }

    // singleton pattern
    public static getInstance(server: http.Server): SocketManager {
        if (!SocketManager.instance) {
            if (!server) {
                new Error("Socket server not initialized yet");
            }

            SocketManager.instance = new SocketManager(server);
        }
        return SocketManager.instance;
    }

    private initializeEvents() {
        this.io.on("connection", (socket: Socket) => {
            console.log("User Connected :: ", socket.id);

            const userId = socket.handshake.query.userId as string | undefined;

            if(userId && userId !== undefined){
                userSocketMap[userId] = socket.id;
                console.log(`User mapping : userId ${userId} with socketId ${socket.id} `);
            }

            // register default handlers
            this.registerDefaultHandlers(socket);

            this.io.emit("getOnlineUser" , Object.keys(userSocketMap));

            socket.on("disconnect", () => {
                console.log("User disconnected :: ", socket.id);
                if(userId){
                    delete userSocketMap[userId];
                    console.log(`userID ${userId} removed from online users`);
                    this.io.emit("getOnlineUser" , Object.keys(userSocketMap));
                }
            })

            socket.on("connect_error" , (error) => {
                console.log("Socket connection error ::" , error);
            })
        })
    }

    private registerDefaultHandlers(socket: Socket) {
        socket.on("message" , (data : any) => {
            console.log("message recieved" , data);
            this.io.emit('message' , data);
        })

        socket.on("joinRoom" , (roomId: string) => {
            socket.join(roomId);
            console.log(`🟢 User ${socket.id} joined Room - ${roomId}`);
        })

        socket.on("leaveRoom" , (roomId: string) => {
            socket.leave(roomId);
            console.log(`🔴 User ${socket.id} Left Room - ${roomId}`);
        })
    }

    public emitToRoom(roomId: string , event: string , payload: string){
        this.io.to(roomId).emit(event,payload);
    }

}


