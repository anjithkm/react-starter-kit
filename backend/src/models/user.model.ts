import mongoose, { Document, Schema } from "mongoose";
import { roleEnum } from "@/config/enum";

interface User extends Document {
	user_name: string;
	email: string;
	role: string;
	password: string;
}

const UserSchema: Schema = new Schema({
	user_name: {
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
		default: roleEnum.USER,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

export const Item = mongoose.model<User>("User", UserSchema);
export default Item;
