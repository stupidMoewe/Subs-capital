import fetch from "node-fetch";
import fs from "fs";

import { ETHEREUM_PROTOCOLES } from "./ethereum-constants";

import tokenList from "../../../data/farm/ethereum-tokens/tokens-list.json";

export const fetchDataEthereum = async () => {
	ETHEREUM_PROTOCOLES.forEach(async (p) => {
		console.log("protocole: ", p);
		const data = await fetch(
			`https://api.zapper.fi/v1/protocols/${p}/farms?network=ethereum&api_key=96e0cc51-a62e-42ca-acee-910ea7d2a241`
		);
		const response: any = await data.json();

		const listOfTokens: string[] = tokenList;

		const allData: object[] = [];
		response.map((pool) => {
			console.log(pool);
			const pair = pool.tokens[0];
			if (
				pair.category == "pool" &&
				!pair.isBlocked &&
				pair.tokens[0]?.symbol &&
				pair.tokens[1]?.symbol
			) {
				const token0: string = pair.tokens[0].symbol;
				const token1: string = pair.tokens[1].symbol;
				const object = new Object({
					id: pair.address,
					name: pair.symbol,
					apr: (pair.fee * pair.volume * 365) / pair.liquidity,
					token0,
					token1,
				});

				if (!listOfTokens.includes(token0)) {
					console.log("New token! : ", token0);
					listOfTokens.push(token0);
				}
				if (!listOfTokens.includes(token1)) {
					console.log("New token! : ", token1);
					listOfTokens.push(token1);
				}

				allData.push(object);
			}
		});

		fs.writeFile(
			"./data/farm/ethereum-tokens/tokens-list.json",
			JSON.stringify(listOfTokens),
			(err: any) => {
				console.log(err);
			}
		);
		fs.writeFile(
			`./data/farm/ethereum-protocols/${p}.json`,
			JSON.stringify(allData),
			(err: any) => {
				console.log(err);
			}
		);
	});
};
