import fs from "fs";
import fetch from "node-fetch";
import tokenList from "../../../data/farm/ethereum-tokens/tokens-list.json";
import { FARMING_BLOCKCHAINS } from "../../constants";
import { calculateApr } from "../../helpers";

export const fetchDataFarming = async () => {
	console.log("fetchDataFarming");
	for (const blockchain of FARMING_BLOCKCHAINS) {
		console.log("------------------------------------------");
		console.log(blockchain.chainName);
		for (const protocol of blockchain.protocols) {
			console.log(protocol);
			const data = await fetch(
				`https://api.zapper.fi/v1/protocols/${protocol}/farms?network=${blockchain.chainName}&api_key=96e0cc51-a62e-42ca-acee-910ea7d2a241`
			);
			const response: any = await data.json();

			const listOfTokens: string[] = tokenList;

			const allData: object[] = [];
			for (const pool of response) {
				const pair = pool.tokens[0];
				if (
					pair.category == "pool" &&
					!pair.isBlocked &&
					pair.tokens[0]?.symbol &&
					pair.tokens[1]?.symbol &&
					pair.volume > 1000000
				) {
					const token0: string = pair.tokens[0].symbol;
					const token1: string = pair.tokens[1].symbol;
					const object = new Object({
						poolAddress: pair.address,
						name: pair.symbol,
						apr: calculateApr(
							pair.fee,
							pair.volume,
							pair.liquidity
						),
						token0,
						token1,
						tvl: Math.round(pair.volume),
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
			}
			console.log("Data fetched");

			fs.writeFile(
				`./data/farm/${blockchain.chainName}-tokens/tokens-list.json`,
				JSON.stringify(listOfTokens),
				(err: any) => {
					console.log("error: ", err);
				}
			);
			fs.writeFile(
				`./data/farm/${blockchain.chainName}-protocols/${protocol}.json`,
				JSON.stringify(allData),
				(err: any) => {
					console.log("error: ", err);
				}
			);
			console.log("Data Updated");
		}
	}
};
