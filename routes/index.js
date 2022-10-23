import express from "express";
import { currentUser } from "../entities/user/user.controller.js";
const router = express.Router();

router.get("/users/me", currentUser);

export default router;
