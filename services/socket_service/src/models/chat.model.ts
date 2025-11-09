import mongoose , {Schema} from "mongoose";
import type { Ichat } from "../types/types.js";

const schema:Schema<Ichat> = new Schema({
    users : [
        {
            type : String,
            required : true
        }
    ],
    latestMessage : {
        text : String,
        sender: String
    }
     
},{
    timestamps : true
});

export const Chat = mongoose.model<Ichat>("Chat",schema);