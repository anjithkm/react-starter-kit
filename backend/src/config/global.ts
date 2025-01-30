import { JwtPayload } from "jsonwebtoken";
import { SessionData } from "express-session";

declare module "express-session" {
	interface SessionData {
		views?: number;
		lastActive?: number;
		user?: JwtPayload;
	}
}

declare module "express" {
	namespace Express {
		interface Request {
			session: SessionData;
		}
	}
}
