import NotFound from "../../helpers/errors/NotFound.js";
import ValidationError from "../../helpers/errors/Validation.js";
import { CREATE, USER_NOT_FOUND_MESSAGE } from "../../lib/constants.js";
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

export { createArticle, getCurrentUserArticles };
