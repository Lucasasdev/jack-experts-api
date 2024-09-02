import express from "express";
import * as controller from "../controllers/controller";
import { verifyJwt } from "../middlewares/verifyToken";
const router = express.Router();

router.post("/auth/register", controller.registerUser);
router.post("/auth/login", controller.login);
router.post("/task", verifyJwt, controller.createTask);
router.get("/tasks", verifyJwt, controller.getTasks);

export default router;
