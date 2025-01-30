import { Request, Response } from "express";
import User from "@/models/user.model";
import bcrypt from "bcrypt";
import { generateToken } from "@/utils/jwt.util";

import { response } from "@/utils/response.util";

export async function login(req: Request, res: Response): Promise<any> {
	const { username, password } = req.body;

	try {
		// Find user by username
		const user = await User.findOne({ username });

		if (!user) {
			return response(res).unauthorized("User does not exists");
		} else {
			// Check password
			const isPasswordValid = await bcrypt.compare(password, user?.password);

			if (!isPasswordValid) {
				return response(res).unauthorized("Invalid credentials");
			}

			// Generate JWT token
			const token = generateToken(user);

			return response(res).success(token);
		}
	} catch (err: any) {
		return response(res).internalError(err);
	}
}

export async function signUp(req: Request, res: Response): Promise<any> {
	try {
		const { user_name, password, email } = req.body;

		// Check if user already exists
		const existingUser = await User.findOne({ user_name });
		if (existingUser) {
			return response(res).unauthorized("User already exists");
		}

		// Check if email already exists
		const existingEmail = await User.findOne({ email });
		if (existingEmail) {
			return response(res).unauthorized("Email already exists");
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create new user
		const newUser = new User({ ...req.body, password: hashedPassword });
		await newUser.save();

		return response(res).success("User created successfully");
	} catch (err: any) {
		return response(res).internalError(err);
	}
}
