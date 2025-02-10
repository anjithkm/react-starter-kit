import { Request, Response } from "express";
import User from "@/models/user.model";
import bcrypt from "bcrypt";
import { JwtPayload } from "jsonwebtoken";
import { generateToken, generateRefreshToken, verifyToken } from "@/utils/jwt.util";
import { response } from "@/utils/response.util";

export async function refresh(req: Request, res: Response): Promise<any> {

	try {

		const { access_token, refresh_token } = req.query;

		if(!access_token){
			return response(res).unauthorized("Invalid access token");
		}

		if(!refresh_token){
			return response(res).unauthorized("Invalid refresh token");
		}

		const data = verifyToken(`${refresh_token}`); // Add token info to request

		if(!data){
			return response(res).unauthorized("Refresh token expired");
		}

		delete data.type;
		delete data.iat;
		delete data.exp;

		const user = verifyToken(`${access_token}`); // Add token info to request

		if(!user){
			// Generate JWT token
		    const access_token = generateToken({ ...data, type: 'access_token' });
			return response(res).success({ ...data, access_token, refresh_token });
		}


		return response(res).success({ ...data,access_token, refresh_token });

	} catch (err: any) {
		return response(res).internalError(err);
	}
}

export async function login(req: Request, res: Response): Promise<any> {

	try {

		const { user_name, password } = req.body;

		console.log("req.headers.origin",req.headers)
		// console.log("req.session",req.session)

		// Find user by username
		const user = await User.findOne({ user_name });

		if (!user) {
			return response(res).unauthorized("User does not exists");
		}

		const isPasswordValid = await bcrypt.compare(password, user?.password);

		if (!isPasswordValid) {
			return response(res).unauthorized("Invalid credentials");
		}

		const data = {
			email: user.email,
			role: user.role,
			id: user._id,
			user_name: user.user_name,
		};

		// Generate JWT token
		const access_token = generateToken({ ...data, type: 'access_token' });
		const refresh_token = generateRefreshToken({ ...data, type: 'refresh_token' });

		return response(res).success({ ...data, access_token, refresh_token });

	} catch (err: any) {
		return response(res).internalError(err);
	}
}

export async function signUp(req: Request, res: Response): Promise<any> {
	try {
		const { user_name, password, email } = req.body;

		console.log("req.body",req.body)

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
		const data = await newUser.save();
// "User created successfully"
		return response(res).success(data);
	} catch (err: any) {
		return response(res).internalError(err);
	}
}
