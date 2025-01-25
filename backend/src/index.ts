import '@/config/global'

import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes"; // Import item routes

const app = express();
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/test";

// Middleware
app.use(cors());
app.use(express.json());

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
	.catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api", routes); // Use item routes

app.get("/", (req: Request, res: Response) => {
	res.send("Hello, World!");
});
