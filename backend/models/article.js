const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const articleSchema = new Schema({
	title: { type: String, required: true },
	subHeader: { type: String, required: false },
	parutionDate: { type: String, required: false },
	readingTime: { type: Number, required: false },
	author: { type: String, required: false },
	text: { type: String, required: true },
});

articleSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Article", articleSchema);
