import { Request, Response } from "express";
import Item from "#/src/models/Item.model";

export async function getItem(req: Request, res: Response) {
	try {
		const items = await Item.find();
		res.json(items);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
}

export async function postItem(req: Request, res: Response) {
	try {
		const newItem = new Item(req.body);
		const savedItem = await newItem.save();
		res.status(201).json(savedItem);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
}
