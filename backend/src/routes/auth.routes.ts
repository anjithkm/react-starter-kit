import { Router } from "express";
import { login, signUp } from "@/controllers/auth.controller";
import { authenticate } from "@/middlewares/authenticate.middleware";

const router = Router();

// Route to get all items
router.get("/login", login);

// Route to create a new item
router.post("/sign-up", signUp);

export default router;
