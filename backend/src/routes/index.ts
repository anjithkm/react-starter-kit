import { Router } from "express";

import itemRoute from "@/routes/item.routes";
import authRoute from "@/routes/auth.routes";

const router = Router();

router.use("/item", itemRoute);
router.use("/auth", authRoute);

export default router;
