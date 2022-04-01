import fetch from "node-fetch";
import sushiswapData from "../data/farm/ethereum-protocols/sushiswap.json";
import { fetchDataEthereum } from "./populate/farm/ethereum";
import { updateWeights } from "./run-python";
import constants from "./variables.json";

const url = `http://localhost:4000/graphql`;

const createTS = `mutation {
  newTimestamp {
    timestamp {
      beginTime
      endTime}
    errors {
      message
    }}}`;

const createBC = `mutation($name: String!)  {
  addBlockchain(name: $name) {
    blockchain {
      id
    }
    errors {
      message
    }
  }
}`;

const createProtocol = `mutation($name: String!, $blockchainName: String!) {
  addProtocol(name: $name, blockchainName: $blockchainName) {
    protocol {
      name
    }
    errors {
      message
    }
}}`;
const createPool = `mutation($poolAddress: String!, $protocolName: String!, $token0: String!,$token1: String!, $apr: Float!, $tvl: Float! ) {
  addPool(input: { poolAddress:$poolAddress,protocolName: $protocolName, token0: $token0, token1: $token1, apr: $apr, tvl: $tvl }) {
    pool {
      poolName
    }
    errors{
      message
    }
  }
}
`;

const updateProtocol = `mutation($protocolId: Float!, $apr: Float!, $risk: Float! ){
  updateProtocol(protocolId: $protocolId,apr: $apr, risk: $risk)
}`;

const updatePool = `mutation($protocolId: Float!, $poolAddress: String!, $weight: Float! ){
  updatePool(protocolId: $protocolId, poolAddress:$poolAddress, weight: $weight)
}`;

const getProtocol = `query{
	protocolLast{
		id
	}
}`;

export const callGraphQL = async (query, variables = {}) => {
	const data = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({
			query,
			variables,
		}),
	})
		.then((r) => r.json())
		.then((data) => {
			return data;
		});
	return data;
};

export const dailyUpdate = async () => {
	/////////////////////////////////////
	/// STEP 1: fetch dat from Zapper ///
	/////////////////////////////////////
	const rmin = 10000000;
	// update data
	console.log("Fetching Data");
	await fetchDataEthereum();
	/////////////////////////////////////
	/// STEP 2: Update Database /////////
	/////////////////////////////////////

	console.log("Creating new Timestamp");
	// create new TS
	const ts = await callGraphQL(createTS);
	console.log(ts.data.newTimestamp.errors);

	// add BCs and protocols
	const blockchains = constants.blockchains;
	const protocols = constants.protocols;

	// creatiom new BC and protocols
	for (var [index, bcName] of blockchains.entries()) {
		console.log("###### bcName: ", bcName, " ######");
		const variablesBC = { name: bcName };
		await callGraphQL(createBC, variablesBC);
		const protocolsOnCurrentBC = protocols[index][bcName];
		for (const protocol of protocolsOnCurrentBC) {
			console.log("### protocol: ", protocol, " ###");
			const variablesProtocol = {
				name: protocol,
				blockchainName: bcName,
			};
			await callGraphQL(createProtocol, variablesProtocol);

			// creation new pools
			for (const pool of sushiswapData) {
				const variablesPool = {
					poolAddress: pool.poolAddress,
					protocolName: protocol,
					token0: pool.token0,
					token1: pool.token1,
					apr: pool.apr,
					tvl: pool.tvl,
				};
				await callGraphQL(createPool, variablesPool);
			}

			/////////////////////////////////////
			/// STEP 3: Weights Calculation /////
			/////////////////////////////////////
			//
			/////////////////////////////////////
			/// STEP 3.1: RUN PORTFLIO ALGO /////
			/////////////////////////////////////
			//
			// run python file with :
			// - tokens
			// - pools used with apr

			// calculate weights and update pools
			const tokens: String[] = [];
			const pools: String[] = [];
			const pBar: Number[] = [];
			for (const pool of sushiswapData) {
				pBar.push(pool.apr);
				if (!tokens.includes(pool.token0)) tokens.push(pool.token0);
				if (!tokens.includes(pool.token1)) tokens.push(pool.token1);
				const poolName = pool.token0 + "-" + pool.token1;
				pools.push(poolName);
			}

			const data: any = await updateWeights(rmin, pools, pBar, tokens);
			const risk = data[0].risk;
			const weights = data[1].results;
			const poolsUsed = data[2].pools;

			//
			/////////////////////////////////////
			/// STEP 3.2: UPDATE EACH POOL ////////
			/////////////////////////////////////
			//
			// update protocol risk + apr

			// get protocol
			const currentProtocol = await callGraphQL(getProtocol);
			const currentProtocolId = currentProtocol.data.protocolLast.id;
			//
			//
			console.log("createdProtocol: ", currentProtocol);
			const variablesUpdateProtocol = {
				protocolId: currentProtocolId,
				risk,
				apr: rmin,
			};
			await callGraphQL(updateProtocol, variablesUpdateProtocol);
			// fetch each pool and update weight
			let index = 0;
			for (const poolEntry of sushiswapData) {
				const parsePoolName = poolEntry.token0 + "-" + poolEntry.token1;
				if (poolsUsed.includes(parsePoolName)) {
					const variablesUpdatePool = {
						poolAddress: poolEntry.poolAddress,
						protocolId: currentProtocolId,
						weight: weights[index],
					};
					await callGraphQL(updatePool, variablesUpdatePool);
					index++;
				}
			}

			///// DB should be now updated with daily data + weights
		}
	}
};
