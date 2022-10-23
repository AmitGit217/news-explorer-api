import express from "express";
import {
  createArticle,
  deleteArticleById,
  getCurrentUserArticles,
} from "../entities/article/article.controller.js";
import { currentUser } from "../entities/user/user.controller.js";
import { articleValidation, celebrateId } from "../middlewares/celebrate.js";
const router = express.Router();

router.get("/users/me", currentUser);

router.post("/articles", articleValidation, createArticle);
router.get("/articles", getCurrentUserArticles);
router.delete("/articles/:_id", celebrateId, deleteArticleById);

export default router;
