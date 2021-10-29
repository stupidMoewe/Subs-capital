const Article = require("../models/article");

const getAllArticles = async (req, res, next) => {
	let articles;
	try {
		articles = await Article.find();
	} catch (err) {
		return next(err);
	}

	res.json({
		articles: articles.map((art) => art.toObject({ getters: true })),
	});
};

const getArticleById = async (req, res, next) => {
	let article;
	const artId = req.params.id;
	try {
		article = await Article.findById(artId);
	} catch (err) {
		return next(err);
	}
	console.log(article);

	res.status(200).json({ article: article.toObject({ getters: true }) });
};

const addArticle = async (req, res, next) => {
	const { title, subHeader, readingTime, author, text } = req.body;
	const timeElapsed = Date.now();
	const today = new Date(timeElapsed);
	const createNewArticle = new Article({
		title,
		subHeader,
		parutionDate: today.toLocaleDateString(),
		readingTime,
		author,
		text,
	});

	try {
		createNewArticle.save();
	} catch (err) {
		return next(err);
	}
	res.status(201).json({
		article: createNewArticle.toObject({ getters: true }),
	});
};

// router.patch("/updatearticle/:aid", articlesControllers.updateArticle);

exports.getAllArticles = getAllArticles;
exports.getArticleById = getArticleById;
exports.addArticle = addArticle;
