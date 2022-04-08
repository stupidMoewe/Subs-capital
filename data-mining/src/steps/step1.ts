// STEP 1: From Layer 1 to Layer 2

import { FARMING_BLOCKCHAINS, rmin } from "../constants";
import {
	callGraphQL,
	getPoolsByProtocolId,
	getProtocolsLastTS,
	updatePool,
	updateProtocol,
} from "../graphqlQueries";
import { updateWeights } from "../run-python";

export const protocolLayerResults = async () => {
	console.log("########## BEGIN STEP 1 ##########");
	for (const blockchain of FARMING_BLOCKCHAINS) {
		for (const protocol of blockchain.protocols) {
			const protocolData =
				await require(`../../../data/farm/${blockchain.chainName}-protocols/${protocol}.json`);
			//
			///////////////////////////////////////////
			/// STEP 3: Pools Weights Calculation /////
			///////////////////////////////////////////
			//
			/////////////////////////////////////
			/// STEP 3.1: RUN PORTFLIO ALGO /////
			/////////////////////////////////////
			//
			// calculate weights and update pools
			const tokens: String[] = [];
			const pools: String[] = [];
			const pBar: Number[] = [];
			for (const pool of protocolData) {
				pBar.push(pool.apr);
				if (!tokens.includes(pool.token0)) tokens.push(pool.token0);
				if (!tokens.includes(pool.token1)) tokens.push(pool.token1);
				const poolName = pool.token0 + "-" + pool.token1;
				pools.push(poolName);
			}

			const data: any = await updateWeights(rmin, pools, pBar, tokens);
			const risk = Math.floor(data[0].risk * 10 ** 8);
			const weights = data[1].results;
			const poolsUsed = data[2].pools;

			//
			/////////////////////////////////////
			/// STEP 3.2: UPDATE EACH POOL ////////
			/////////////////////////////////////
			//
			// update protocol risk + apr
			// get protocol
			const protocols = await callGraphQL(getProtocolsLastTS);
			const lastProtocols = protocols.data.protocolsLastTS;
			let currentProtocol;
			for (const protocol of lastProtocols) {
				if (protocol.blockchain.name == blockchain.chainName)
					currentProtocol = protocol;
			}
			// TODO: calculate apr protocol + risque

			// UPDATE EACH POOL
			// fetch each pool and update weight
			let index = 0;
			for (const poolEntry of protocolData) {
				const parsePoolName = poolEntry.token0 + "-" + poolEntry.token1;
				if (poolsUsed.includes(parsePoolName)) {
					const variablesUpdatePool = {
						protocolId: currentProtocol.id,
						poolAddress: poolEntry.poolAddress,
						weight: weights[index],
					};
					const data = await callGraphQL(
						updatePool,
						variablesUpdatePool
					);
					console.log("Updating pool : ", data);
					index++;
				}
			}

			// UPDATE EACH PROTOCOL with updated pools
			const variablePoolByProtocolId = {
				protocolId: currentProtocol.id,
			};
			const currentProtocolPools = await callGraphQL(
				getPoolsByProtocolId,
				variablePoolByProtocolId
			);
			let protocolApr = 0;
			for (const pool of currentProtocolPools.data.poolsByProtocolId) {
				protocolApr += pool.apr * pool.weight;
			}
			console.log("risk (should be different of 0): ", risk);
			const variablesUpdateProtocol = {
				protocolId: currentProtocol.id,
				risk,
				apr: Math.round(protocolApr / 10 ** 8),
				weight: 0,
			};
			const dataProtocol = await callGraphQL(
				updateProtocol,
				variablesUpdateProtocol
			);
			console.log("dataProtocol update : ", dataProtocol);
			// DB should be now updated with daily data + weights
		}
	}
	console.log("########## END STEP 1 ##########");
};
