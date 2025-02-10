import { Router } from "express";
import { login, signUp, refresh } from "@/controllers/auth.controller";
import { authenticate } from "@/middlewares/authenticate.middleware";

const router = Router();

// Route to get all items
router.post("/login", login);

// Route to create a new item
router.post("/sign-up", signUp);
router.get("/refresh", refresh);

export default router;
