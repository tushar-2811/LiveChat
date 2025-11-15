import type { Document, Types } from "mongoose";
export interface Ichat extends Document {
    users: string[];
    latestMessage: {
        text: string;
        sender: string;
    };
    createdAt: Date;
    updateAt: Date;
}
export interface Imessage extends Document {
    chatId: Types.ObjectId;
    sender: string;
    text?: string;
    image?: {
        url: string;
        publicId: string;
    };
    messageType: "text" | "image";
    isSeen: boolean;
    seenAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=types.d.ts.map