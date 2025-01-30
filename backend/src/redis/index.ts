import Redis from "ioredis";

const redis = new Redis({
	host: process.env.REDIS_HOST || "localhost", // Or the Redis server URL
	port: parseInt(process?.env?.REDIS_PORT || "6379"), // Default Redis port
	// Optionally add authentication if needed (password, etc.)
});

redis.on("connect", () => {
	console.info("Redis connected:");
});

redis.on("error", (err) => {
	console.error("Redis error:", err);
});

redis.on("ready", () => {
	console.log("Redis is ready to use");
});

export default redis;
