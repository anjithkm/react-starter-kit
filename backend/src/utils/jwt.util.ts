import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const secretKey: Secret = process.env.JWT_SECRET || "your_secret_key"; // Use an environment variable in production


export function generateToken(payload: any): string {
	return jwt.sign(payload, secretKey, { expiresIn: "15m" });
}

export function generateRefreshToken(payload: any): string {
	return jwt.sign(payload, secretKey, { expiresIn: "8h" });
}

export function verifyToken(token: string): JwtPayload | null {
	try {
		const verified = jwt.verify(token, secretKey) as JwtPayload;
		console.log("verified",verified)
		return verified
	} catch (error) {
		return null;
	}
}

