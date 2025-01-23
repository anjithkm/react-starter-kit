import { Request, Response } from "express";
import User from "@/models/user.model";
import { response } from '@/utils/response.utils';

export async function login (req: Request, res: Response) {
    try {
        const user = await User.find();
        response(res).success(user);
    } catch (err: any) {
        response(res).internalError(err);
    }
}

export async function signUp(req: Request, res: Response) {
    try {
        const newItem = new User(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}