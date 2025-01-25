import { Request, Response } from "express";
import Item from "@/models/Item.model";

import { response } from '#/src/utils/response.util';

export async function getItem(req: Request, res: Response) :Promise<any> {
	
	try {
		
		const items = await Item.find().exec();

		console.log("items",items)

		if(items.length == 0){
			return response(res).notFound();
		}

		return response(res).success(items);

	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
}

export async function postItem(req: Request, res: Response):Promise<any> {
	try {
		const newItem = new Item(req.body);
		const savedItem = await newItem.save();
		res.status(201).json(savedItem);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
}
