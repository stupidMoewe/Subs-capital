const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const usersRoutes = require("./routes/users-routes");

const app = express();
var apiPort = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

// Main Routes
app.use("/api/users", usersRoutes);

app.get("/", (req, res) => {
	res.send("Hello World!!");
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
