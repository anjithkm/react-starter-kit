import { Router } from "express";

import postRoute from "#/src/routes/post.routes";
import authRoute from "@/routes/auth.routes";

const router = Router();

router.use("/post", postRoute);
router.use("/auth", authRoute);

export default router;
