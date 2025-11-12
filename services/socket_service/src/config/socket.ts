import { Server, Socket } from "socket.io";
import http from 'http';

const userSocketMap: Record<string , string> = {};

export const getRecieverSocketId = (recieverId : string): string | undefined => {
    return userSocketMap[recieverId];
}

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

            if(userId){
                socket.join(userId);
            }

            socket.on("typing" , (data) => {
                console.log(`user ${data.userId} is typing`);
                this.emitToRoom(data.chatId , "userTyping" , {
                    chatId : data.chatId,
                    userId : data.userId
                })
            });

            socket.on("stopTyping" , (data) => {
                 console.log(`user ${data.userId} stopped typing`);
                  this.emitToRoom(data.chatId , "userStoppedTyping" , {
                    chatId : data.chatId,
                    userId : data.userId
                })
            })


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

        socket.on("joinChat" , (chatId: string) => {
            socket.join(chatId);
            console.log(`🟢 User ${socket.id} joined Room - ${chatId}`);
        })

        socket.on("leaveChat" , (chatId: string) => {
            socket.leave(chatId);
            console.log(`🔴 User ${socket.id} Left Room - ${chatId}`);
        })
    }

    public getSocket(socketId:any){
        return this.io.sockets.sockets.get(socketId);
    }

    public emitToRoom(roomId: string , event: string , payload: any){
        this.io.to(roomId).emit(event,payload);
    }

}


