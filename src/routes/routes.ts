import express from "express";
import * as controller from "../controllers/controller";
const router = express.Router();

router.post("/auth/register", controller.registerUser);

export default router;
