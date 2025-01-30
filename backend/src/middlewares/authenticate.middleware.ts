import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { response } from "#/src/utils/response.util";

export const authenticate = (...roles: string[]) =>
	async function (req: Request, res: Response, next: NextFunction): Promise<any> {
		const token = req.header("Authorization")?.replace("Bearer", "").trim() || "";

		if (!token) {
			return response(res).unauthorized("Invalid Token");
		} else {
			try {
				req.session.user = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload; // Add token info to request

				if (!roles.includes(req.session?.user?.role)) {
					return response(res).unauthorized();
				} else {
					next();
				}
			} catch (err: any) {
				return response(res).unauthorized(err);
			}
		}
	};

export default authenticate;
