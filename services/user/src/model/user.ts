import mongoose,{Schema} from "mongoose";
import type { IUser } from "../types/index.js";

const schema:Schema<IUser> = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    }
},{
    timestamps : true
});

export const User = mongoose.model<IUser>("User" , schema);
