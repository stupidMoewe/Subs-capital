import fetch from "node-fetch";

const url = `http://localhost:4000/graphql`;

export const test = () => {
	var query = `{
    timestamps{
        id
        beginTime
        endTime
        blockchains{
        name
        id
        }
        }
    }`;

	fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({
			query,
		}),
	})
		.then((r) => r.json())
		.then((data) => console.log("data returned:", data?.data.timestamps));
	return "test2";
};
