import cors from "cors";
import express from "express";
import path from "path";
import farmWeights from "./data/farm/ethereum/optimalWeights.json";
// import populateDataAave from "./populate/aave";
let { PythonShell } = require("python-shell");

const runPythonFile = async () => {
	const options = {
		mode: "text",
		stderrParser: true,
		pythonOptions: ["-u"],
		scriptPath: path.join(__dirname, "../"),
		args: [],
	};
	// await new Promise((resolve, reject) => {
	// 	PythonShell.run("./python/aave.py", options, (err, results) => {
	// 		console.log("inside runner", err, results);
	// 		if (err) reject(err);
	// 		return resolve(results);
	// 	});
	// });
	await PythonShell.run(
		"./python/farm/calculatePortfoliosA.py",
		options,
		(err, results) => {
			if (err) console.log(err);
			console.log(results);
			return results;
		}
	);
};

const main = async () => {
	const app = express();
	app.use(cors());

	//transformDailyDataToCsv();
	runPythonFile();

	app.get("/farm/eth/data", async (_, res) => {
		res.send(farmWeights);
	});

	app.listen(4001, () => {
		console.log("Server started on localhost:4001");
	});
};
main().catch((err) => {
	console.error(err);
});
