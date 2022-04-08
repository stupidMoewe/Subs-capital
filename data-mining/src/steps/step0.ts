import { fetchDataFarming } from "../populate/farming";
import { FARMING_BLOCKCHAINS } from "../constants";
import {
	callGraphQL,
	createBC,
	createPool,
	createProtocol,
	createTS,
} from "../graphqlQueries";

export const initialFetching = async () => {
	console.log("########## BEGIN FETCHING ##########");
	//
	/////////////////////////////////////
	/// STEP 1: fetch data from Zapper ///
	/////////////////////////////////////
	//
	// update data
	console.log("Fetching Data");
	await fetchDataFarming();

	//
	/////////////////////////////////////
	/// STEP 2: Update Database /////////
	/////////////////////////////////////
	//
	console.log("Creating new Timestamp");
	// create new TS
	await callGraphQL(createTS);

	// add BCs and protocols
	const blockchains = FARMING_BLOCKCHAINS;
	// const protocols = constants.protocols;

	// creatiom new BC and protocols
	for (var [_, blockchain] of blockchains.entries()) {
		console.log("------------------------------------------------");
		console.log("|-- ", blockchain.chainName, "");

		const variablesBC = { name: blockchain.chainName };
		await callGraphQL(createBC, variablesBC);
		const protocolsOnCurrentBC = blockchain.protocols;
		for (const protocol of protocolsOnCurrentBC) {
			console.log("|----- ", protocol, "");
			const variablesProtocol = {
				name: protocol,
				blockchainName: blockchain.chainName,
			};
			await callGraphQL(createProtocol, variablesProtocol);
			// for (const protocol of blockchain.protocols) {
			const protocolData =
				await require(`../../../data/farm/${blockchain.chainName}-protocols/${protocol}.json`);
			// creation new pools
			for (const pool of protocolData) {
				const variablesPool = {
					poolAddress: pool.poolAddress,
					protocolName: protocol,
					token0: pool.token0,
					token1: pool.token1,
					apr: pool.apr,
					tvl: pool.tvl,
					weight: 0,
				};
				const data = await callGraphQL(createPool, variablesPool);
				console.log(data);
			}
			// }
		}
	}
	console.log("########## END FETCHING ##########");
};
