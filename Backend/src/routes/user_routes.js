import express from "express";
import { createUser, getAllUsers } from "../controllers/user_controller.js";
const router = express.Router();

router.get("/api/users", getAllUsers);
router.post("/api/users", createUser);

export default router;
