import { Request, Response } from "express";
import Post from "#/src/models/post.model";

import { response } from "@/utils/response.util";

export async function getPosts(req: Request, res: Response): Promise<any> {
	try {
		const items = await Post.find().exec();

		// if (items.length == 0) {
		// 	return response(res).notFound();
		// }

		return response(res).success(items);
	} catch (err: any) {
		response(res).internalError(err);
	}
}

export async function postPosts(req: Request, res: Response): Promise<any> {
	try {
		const newItem = new Post(req.body);
		const savedItem = await newItem.save();
		res.status(201).json(savedItem);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
}
