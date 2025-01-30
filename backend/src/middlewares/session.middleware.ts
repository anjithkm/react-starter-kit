import { Request, Response, NextFunction } from "express";
import { roleEnum, constEnum } from "@/config/enum";

import { response } from "@/utils/response.util";

const sessionExpiration = constEnum.SESSION_EXP;

export async function sessionValidate(req: Request, res: Response, next: NextFunction): Promise<any> {
	const now = Date.now();
	if (req.session && req.session.lastActive) {
		const timeSinceLastActive = now - req.session.lastActive;

		if (timeSinceLastActive > sessionExpiration) {
			req.session.destroy((err: any) => {
				if (err) {
					console.error("Error destroying session:", err);
					return response(res).internalError(err, "Error session destroying");
				}
				return response(res).unauthorized("Session expired due to inactivity");
			});
		}
	} else {
		req.session.lastActive = now;
	}
	next();
}

export default sessionValidate;
