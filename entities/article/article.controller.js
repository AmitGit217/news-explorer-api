import { CREATE } from "../../lib/constants.js";
import Article from "./article.schema.js";

const createArticle = (req, res, next) => {
  const { id } = req.user;
  Article.create({ ...req.body, owner: id }).then((data) => {
    const { owner, ...article } = data._doc;
    res.status(CREATE).send(article);
  });
};

export { createArticle };
