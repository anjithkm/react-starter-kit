import mongoose, { Document, Schema } from "mongoose";

interface IItem extends Document {
	name: string;
}

const PostSchema: Schema = new Schema({
	title: {
		type: String,
		required: true,
	},
	body: {
		type: String,
		required: false,
	},
});

export const Post = mongoose.model<IItem>("Post", PostSchema);
export default Post;
