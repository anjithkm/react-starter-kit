import { Router } from "express";
import { getPosts, postPosts } from "#/src/controllers/post.controller";
import { authenticate } from "../middlewares/authenticate.middleware";
import { roleEnum } from "@/config/enum";

const router = Router();

// Route to get all items
router.get("/get", authenticate(roleEnum.ADMIN, roleEnum.USER), getPosts);

// Route to create a new item
router.post("/post", authenticate(roleEnum.ADMIN), postPosts);

export default router;
