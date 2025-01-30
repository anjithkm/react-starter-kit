import { Router } from "express";
import { getItem, postItem } from "@/controllers/item.controller";
import { authenticate } from "../middlewares/authenticate.middleware";
import { roleEnum } from "@/config/enum";

const router = Router();

// Route to get all items
router.get("/get", authenticate(roleEnum.ADMIN, roleEnum.USER), getItem);

// Route to create a new item
router.post("/post", authenticate(roleEnum.ADMIN), postItem);

export default router;
