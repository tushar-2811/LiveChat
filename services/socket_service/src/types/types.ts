
export interface Ichat extends Document {
     users: string[];
     latestMessage : {
        text : string
        sender : string
     };
     createdAt : Date;
     updateAt : Date;
}