import express from "express";
import { currentUser } from "../user/user.controller";
const router = express.Router();

router.get("/users/me", currentUser);

export default router;
