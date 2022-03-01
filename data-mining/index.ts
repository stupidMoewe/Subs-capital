import express from "express";
import populateDataAave from "./src/populate/lending/aave";
import fs from "fs";
import cors from "cors";
import { dailyUpdate } from "./init-db";

//lending json
import aaveJson from "./data/lending/aave.json";
import anchorJson from "./data/lending/anchor.json";

// farming json
// eth
import ethereumSushiswapJson from "./data/farm/ethereum-protocols/sushiswap.json";
import ethereumUniswapJson from "./data/farm/ethereum-protocols/uniswap-v2.json";
import tokensEthereum from "./data/farm/ethereum-tokens/tokens-list.json";

import { fetchDataEthereum } from "./src/populate/farm/ethereum";

const lendingStrategy = () => {
	fs.exists("./data/lending/aave.json", (exists) => {
		if (exists) {
			fs.readFile(
				"./data/lending/aave.json",
				"utf8",
				async (err, data) => {
					if (data.length == 0) {
						console.log("lets fetch the data from aave");
						await populateDataAave();
					}
				}
			);
		} else {
			console.log(
				"file for aave data does not exist. It will be generated"
			);
		}
	});
};

const farmingStrategy = async () => {
	return fetchDataEthereum();
};

const main = async () => {
	const app = express();
	app.use(cors());

	//lendingStrategy();
	await farmingStrategy();

	console.log(dailyUpdate());

	/////////////////
	//// LENDING ////
	/////////////////
	app.get("/aave", async (_, res) => {
		res.send(aaveJson);
	});
	app.get("/anchor", async (_, res) => {
		res.send(anchorJson);
	});

	/////////////////
	//// FARMING ////
	/////////////////
	app.get("/farm/ethereum/sushiswap", async (_, res) => {
		res.send(ethereumSushiswapJson);
	});
	app.get("/farm/ethereum/uniswap", async (_, res) => {
		res.send(ethereumUniswapJson);
	});
	app.get("/farm/ethereum/tokens", async (_, res) => {
		res.send(tokensEthereum);
	});

	app.listen(1234, () => {
		console.log("server started on localhost:1234!");
	});
};
main().catch((err) => {
	console.error(err);
});
