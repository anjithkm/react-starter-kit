import mongoose, { Document, Schema } from "mongoose";
import { roleEnum } from "@/config/enum";

interface User extends Document {
    name: string;
    email: string;
    role: string;
}

const UserSchema: Schema = new Schema({
    _id: {
        type: mongoose.Types.ObjectId,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: Object.values(roleEnum),
        required: true,
    },
});

export const Item = mongoose.model<User>("Item", UserSchema);
export default Item;