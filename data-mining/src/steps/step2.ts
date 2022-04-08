import fetch from "node-fetch";
import { calculateAprRiskGlobal } from "../helpers";
import { FARMING_BLOCKCHAINS } from "../constants";
import {
	callGraphQL,
	getLastProtocolByBCName,
	updateBlockchain,
	updateWeightProtocol,
} from "../graphqlQueries";

export const blockchainLayerResults = async () => {
	console.log("########## BEGIN STEP 2 ##########");

	/* 
		1. calculate protocol weights for each blockchain
	*/
	let protocolsTVL: Object = {};
	for (const blockchain of FARMING_BLOCKCHAINS) {
		for (const protocol of blockchain.protocols) {
			if (!protocolsTVL[protocol]) {
				const tvl = await (
					await fetch(`https://api.llama.fi/tvl/${protocol}`)
				).json();
				protocolsTVL = { ...protocolsTVL, [protocol]: parseInt(tvl) };
			}
		}
	}
	const totalTVL = Object.values(protocolsTVL).reduce((a, b) => a + b);

	/* 
		2. update weight value for each protocol in DB 
	*/
	for (const blockchain of FARMING_BLOCKCHAINS) {
		for (const protocolName of blockchain.protocols) {
			const protocolProportion =
				(protocolsTVL[protocolName] / totalTVL) * 10 ** 8;
			// update weight value for each protocol
			const variablesUpdateProtocol = {
				protocolName: protocolName,
				weight: protocolProportion,
			};
			await callGraphQL(updateWeightProtocol, variablesUpdateProtocol);
		}
	}

	/* 
		3. calculate apr + risk values for each blockchain
	*/
	for (const blockchain of FARMING_BLOCKCHAINS) {
		const aprList: number[] = [];
		const weightsList: number[] = [];
		const risksList: number[] = [];
		for (const _ of blockchain.protocols) {
			// fetch protocol apr + risk
			const variablesGetProtocolsByBCLastTS = {
				blockchainName: blockchain.chainName,
			};
			const p = await callGraphQL(
				getLastProtocolByBCName,
				variablesGetProtocolsByBCLastTS
			);
			const { apr, weight, risk } = p.data.lastProtocolByBCName;
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
		const aprBC = globalResults[0];
		const riskBC = globalResults[1];

		/* 
			4. update apr + risk values for each blockchain
		*/
		const variablesUpdateBlockchain = {
			blockchainName: blockchain.chainName,
			apr: aprBC,
			risk: riskBC,
		};
		const result = await callGraphQL(
			updateBlockchain,
			variablesUpdateBlockchain
		);
		console.log(result);
	}

	console.log("########## END STEP 2 ##########");
};
