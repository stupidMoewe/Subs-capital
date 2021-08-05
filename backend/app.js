var PORT = process.env.PORT || 5000;
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const articlesRoutes = require("./routes/articles-routes");
const usersRoutes = require("./routes/users-routes");

const app = express();

// var allowCrossDomain = function (req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
// 	res.header(
// 		"Access-Control-Allow-Headers",
// 		"Content-Type, Authorization, Content-Length, X-Requested-With"
// 	);

// 	// intercept OPTIONS method
// 	if ("OPTIONS" == req.method) {
// 		res.sendStatus(200);
// 	} else {
// 		next();
// 	}
// };

// app.use(allowCrossDomain);

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("/*", function (req, res) {
	res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// app.use(cors());

// Main Routes
app.use("/api/articles", articlesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
	const error = new HttpError("Could not find this route.", 404);
	throw error;
});

app.use((error, req, res, next) => {
	res.locals.error = err;
	const status = 500;
	res.status(status);
	res.render("error");
});

// app.get("/", function (req, res) {
// 	res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
// });

// app.get("/", (req, res) => {
// 	console.log(__dirname);
// 	res.sendFile(path.join(__dirname + "../frontend/build/index.html"));
// });
// app.use(
// 	"/static",
// 	express.static(path.join(__dirname, "../frontend/build/static"))
// );
// app.get("*", function (req, res) {
// 	res.sendFile("index.html", {
// 		root: path.join(__dirname, "../frontend/build/"),
// 	});
// });
mongoose
	.connect(
		`mongodb+srv://subs-db-admin:Subsrelou1!@cluster0.ntrog.mongodb.net/articles?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => {
		app.listen(PORT);
		console.log("__dirname : " + path.join(__dirname, "../frontend/build"));
	})
	.catch((err) => {
		console.log(err);
	});

//`mongodb+srv://subs-db-admin:Subsrelou1!@cluster0.ntrog.mongodb.net/articles?retryWrites=true&w=majority`
