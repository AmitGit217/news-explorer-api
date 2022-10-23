import express from "express";
import {
  createArticle,
  getCurrentUserArticles,
} from "../entities/article/article.controller.js";
import { currentUser } from "../entities/user/user.controller.js";
import { articleValidation } from "../middlewares/celebrate.js";
const router = express.Router();

router.get("/users/me", currentUser);

router.post("/articles", articleValidation, createArticle);
router.get("/articles", getCurrentUserArticles);

export default router;
