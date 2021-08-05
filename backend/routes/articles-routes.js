const express = require("express");

const articlesControllers = require("../controllers/articles-controllers");

const router = express.Router();

router.get("/:id", articlesControllers.getArticleById);
// add route to get preview of 1 article

router.get("/", articlesControllers.getAllArticles);
// add route to get preview of all articles

router.post("/newarticle", articlesControllers.addArticle);

// router.patch("/updatearticle/:aid", articlesControllers.updateArticle);

module.exports = router;
