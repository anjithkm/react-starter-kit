import { Request, Response, NextFunction } from "express";
import { Secret, JwtPayload } from "jsonwebtoken";
import { response } from "#/src/utils/response.util";
import { verifyToken } from "@/utils/jwt.util";

const secretKey: Secret = process.env.JWT_SECRET || "your_secret_key"; // Use an environment variable in production

export const authenticate = (...roles: string[]) =>

	async function (req: Request, res: Response, next: NextFunction): Promise<any> {

	try{

		const token = req.header("Authorization")?.replace("Bearer", "").trim() || "";

		if (!token) {
			return response(res).unauthorized("Invalid Token");
		} else {

			try {
				
				const user = verifyToken(token); // Add token info to request

				if(!user){
					return response(res).invalidToken();
				}

				req.session.user = user as JwtPayload;

				if (!roles.includes(req.session?.user?.role)) {
					return response(res).unauthorized();
				} else {
					next();
				}
			} catch (err: any) {
				return response(res).unauthorized(err);
			}
		}

	}catch(err:any){
		return response(res).internalError(err);
	}

};

export default authenticate;
