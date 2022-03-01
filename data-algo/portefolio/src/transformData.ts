import fs from "fs";
import jsonexport from "jsonexport";
import fetch from "node-fetch";

const protocolsEth = ["uniswap", "sushiswap"];

export const transformDailyDataToCsv = () => {
	// transform uniswap data
	// transform sushiswap data

	protocolsEth.map(async (p) => {
		await fetch("http://localhost:4000/farm/ethereum/" + p)
			.then(async (res) => {
				const result = await res.json();
				console.log(result);
				const csvData = await jsonexport(result);
				fs.writeFile(
					`data/farm/ethereum/${p}.csv`,
					csvData,
					"utf8",
					(err) => {
						console.log(err);
					}
				);
			})
			.catch((err) => {
				console.log(err);
			});
	});
};

export const transformData = async () => {
	// try {
	// 	const data = await fetch("http://localhost:4000/aave");
	// 	const result = await data.json();
	// 	const aaveJsonData = await jsonexport(result);
	// 	fs.writeFile("data/aave.csv", aaveJsonData, "utf8", (err) => {
	// 		console.log(err);
	// 	});
	// 	return true;
	// } catch (err) {
	// 	console.log(err);
	// }
	return false;
};
