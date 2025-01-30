import "@/config/global";

import express, { Request, Response } from "express";
import session from "express-session";
import { RedisStore } from "connect-redis";
import mongoose from "mongoose";
import cors from "cors";
import sessionValidate from "./middlewares/session.middleware";
import routes from "./routes"; // Import item routes
import redis from "./redis";

const app = express();
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/test";

// Middleware
app.use(cors());
app.use(express.json());

// Setup Redis client and connect-redis session store
const redisStore = new RedisStore({ client: redis });

const sessionExpiration = 1000 * 60 * 60 * 8; // 8 hours

app.use(
	session({
		store: redisStore,
		secret: process.env.SESSION_SECRET || "your_secret_key",
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: process.env.NODE_ENV === "production",
			httpOnly: true,
			sameSite: "strict",
			maxAge: sessionExpiration,
		},
	}),
);

app.use(sessionValidate);

// MongoDB connection
mongoose
	.connect(mongoURI)
	.then(() => {
		console.info("MongoDB connected");

		// Start the server
		app.listen(port, () => {
			console.info(`Server running at http://localhost:${port}`);
		});
	})
	.catch((err: any) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api", routes); // Use item routes

app.get("/", (req: Request, res: Response) => {
	res.send("<h1>Welcome!</h1>");
	res.end();
});
