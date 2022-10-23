import NotFound from "../../helpers/errors/NotFound.js";
import ValidationError from "../../helpers/errors/Validation.js";
import {
  ARTICLE_NOT_FOUND_MESSAGE,
  CREATE,
  INVALID_DATA_MESSAGE,
  UNAUTHORIZE_ACTION,
  UNAUTHORIZE_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
} from "../../lib/constants.js";
import Article from "./article.schema.js";

const createArticle = (req, res, next) => {
  const { id } = req.user;
  Article.create({ ...req.body, owner: id })
    .then((data) => {
      const { owner, ...article } = data._doc;
      res.status(CREATE).send(article);
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        throw new ValidationError(error.message);
      }
    })
    .catch(next);
};

const getCurrentUserArticles = (req, res, next) => {
  const { id } = req.user;
  Article.find({ owner: id })
    .orFail()
    .then((articles) => {
      res.send(articles);
    })
    .catch((error) => {
      if (error.name === "DocumentNotFoundError")
        throw new NotFound(USER_NOT_FOUND_MESSAGE);
    })
    .catch(next);
};

const deleteArticleById = (req, res, next) => {
  const articleId = req.params._id;
  const user = req.user.id;
  Article.findById(articleId)
    .orFail()
    .select("+owner")
    .then((article) => {
      const { owner } = article;
      if (user != owner) {
        return res
          .status(UNAUTHORIZE_ACTION)
          .send({ message: UNAUTHORIZE_MESSAGE });
      }
      Article.findByIdAndRemove(articleId).then((data) => res.send(data));
    })
    .catch((error) => {
      if (error.name === "DocumentNotFoundError") {
        throw new NotFound(ARTICLE_NOT_FOUND_MESSAGE);
      } else if (error.name === "CastError") {
        throw new ValidationError(INVALID_DATA_MESSAGE);
      }
    })
    .catch(next);
};

export { createArticle, getCurrentUserArticles, deleteArticleById };
