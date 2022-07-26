import { Router } from "express";
import UserRouter from "@routes/user.route";

const router = Router();
router.use("/users", UserRouter);

export default router;
