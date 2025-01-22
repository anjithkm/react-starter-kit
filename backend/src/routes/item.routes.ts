import { Router } from "express";
import { getItem, postItem } from "@/controllers/item.controller";

const router = Router();

// Route to get all items
router.get("/items", getItem);

// Route to create a new item
router.post("/items", postItem);

export default router;
