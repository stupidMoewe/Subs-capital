let { PythonShell } = require("python-shell");
import path from "path";

export const updateWeights = async (rmin, pools, pBar, tokens) => {
	const options = {
		mode: "json",
		stderrParser: true,
		pythonOptions: ["-u"],
		scriptPath: path.join(__dirname, "../"),
		args: [rmin, pools, pBar, tokens],
	};
	const data = await new Promise((resolve, reject) => {
		console.log("Running python script");
		PythonShell.run(
			"../python/calculatePortfolio.py",
			options,
			(err, results) => {
				console.log(err);
				console.log("Python Results : ", results);
				if (err) return reject(err);
				return resolve(results);
			}
		);
	});
	return data;
};
