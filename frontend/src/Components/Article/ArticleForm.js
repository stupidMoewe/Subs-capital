import React from "react";
import { useState } from "react";

const ArticleForm = () => {
	const [title, setTitle] = useState("");
	const [subTitle, setSubTitle] = useState("");
	const [readingTime, setReadingTime] = useState("");
	const [author, setAuthor] = useState("");
	const [text, setText] = useState("");

	const baseURL = process.env.REACT_APP_BASE_URL;

	const submitHandler = (e) => {
		e.preventDefault();
		if (title && text) {
			fetch(baseURL + "/articles/newarticle", {
				method: "post",
				headers: {
					Accept: "application/json, text/plain, */*",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title,
					subTitle,
					readingTime,
					author,
					text,
				}),
			})
				.then((res) => res.json())
				.then((res) => console.log(res));
		}
	};
	return (
		<div className="articleForm">
			<h2>Nouvel Article</h2>
			<form onSubmit={(e) => submitHandler(e)}>
				<div>
					<label>Titre*</label>
					<input
						type="text"
						required
						onChange={(e) => {
							setTitle(e.target.value);
						}}
					/>
				</div>
				<div>
					<label>2eme titre</label>
					<input type="text" />
				</div>
				<div>
					<label>Temps de lecture</label>
					<input type="text" />
				</div>
				<div>
					<label>Auteur</label>
					<input type="text" />
				</div>
				<div>
					<label>Text*</label>
					<textarea
						cols="40"
						rows="30"
						required
						onChange={(e) => {
							setText(e.target.value);
						}}
					></textarea>
				</div>

				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default ArticleForm;
