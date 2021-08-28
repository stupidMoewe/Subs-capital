const Article = require("../models/article");

// router.get("/", articlesControllers.getAllArticles);
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

// router.get("/article/:id", articlesControllers.getArticleById);
const getArticleById = async (req, res, next) => {
	let article;
	const artId = req.params.id;
	try {
		article = await Article.findById(artId);
	} catch (err) {
		return next(err);
	}

	res.status(200).json({ article: article.toObject({ getters: true }) });
};

// router.post("/newarticle", articlesControllers.addArticle);
const addArticle = async (req, res, next) => {
	console.log("inside new article");
	const { title, subHeader, readingTime, author, text } = req.body;
	console.log(title, subHeader, readingTime, author, text);
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
