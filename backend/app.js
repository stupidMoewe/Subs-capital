const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Article = require("./models/article");
const fs = require("fs");
require("dotenv").config();

const db = require("./db");
const articlesRoutes = require("./routes/articles-routes");
const usersRoutes = require("./routes/users-routes");

const app = express();
var apiPort = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on("error", console.error.bind(console, "MongoDB connection error:"));
// Main Routes
app.use("/api/articles", articlesRoutes);
app.use("/api/users", usersRoutes);
// app.use("/feed.rss", require("./feed.rss"));

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
