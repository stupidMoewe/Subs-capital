import fetch from "node-fetch";
import {
	callGraphQL,
	getLastBCByName,
	updateTimestamp,
	updateWeightBlockchain,
} from "../graphqlQueries";
import { FARMING_BLOCKCHAINS } from "../constants";
import { calculateAprRiskGlobal } from "../helpers";

export const farmingResults = async () => {
	console.log("########## BEGIN STEP 3 ##########");

	/* 
		1. calculate weights of each blockchains for farming
	*/
	const blockchains = FARMING_BLOCKCHAINS.map((b) => {
		return b.id;
	});

	const chains = await (await fetch(`https://api.llama.fi/chains`))
		.json()
		.then((data) => {
			return data.filter((d) => blockchains.includes(d.chainId));
		});

	let totalTVL = 0;
	let protocolsTVL: Object = {};
	for (const [index, chain] of chains.entries()) {
		totalTVL += Math.floor(chain.tvl);
		protocolsTVL = {
			...protocolsTVL,
			[FARMING_BLOCKCHAINS[index].chainName]: parseInt(chain.tvl),
		};
	}

	/* 
		2. update weight value for each blockchain in DB 
	*/
	for (const blockchain of FARMING_BLOCKCHAINS) {
		const blockchainProportion =
			(protocolsTVL[blockchain.chainName] / totalTVL) * 10 ** 8;
		// update weight value for each protocol
		const variablesUpdateBC = {
			blockchainName: blockchain.chainName,
			weight: blockchainProportion,
		};
		await callGraphQL(updateWeightBlockchain, variablesUpdateBC);
	}

	/* 
		3. calculate apr + risk values for farming
	*/
	const aprList: number[] = [];
	const weightsList: number[] = [];
	const risksList: number[] = [];
	for (const blockchain of FARMING_BLOCKCHAINS) {
		// fetch protocol apr + risk
		const variablesGetLastBCByName = {
			blockchainName: blockchain.chainName,
		};
		const p = await callGraphQL(getLastBCByName, variablesGetLastBCByName);
		const { apr, weight, risk } = p.data.lastBCByBCName;
		aprList.push(apr);
		weightsList.push(weight);
		risksList.push(risk);
		// add apr and risk to arrays
	}
	const globalResults: number[] = calculateAprRiskGlobal(
		aprList,
		weightsList,
		risksList
	);
	const aprTS = globalResults[0];
	const riskTS = globalResults[1];
	// update blockchain with new apr and risk
	const variablesUpdateTimestamp = {
		apr: aprTS,
		risk: riskTS,
	};
	const result = await callGraphQL(updateTimestamp, variablesUpdateTimestamp);
	console.log(result);

	/* 
		4. update apr + risk values for farming
	*/

	console.log("########## END STEP 3 ##########");
};
