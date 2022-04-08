import fetch from "node-fetch";

const url = `http://localhost:4000/graphql`;

export const createTS = `mutation {
  newTimestamp {
    timestamp {
      beginTime
      endTime}
    errors {
      message
    }}}`;

export const createBC = `mutation($name: String!)  {
  addBlockchain(name: $name) {
    blockchain {
      id
    }
    errors {
      message
    }
  }
}`;

export const createProtocol = `mutation($name: String!, $blockchainName: String!) {
  addProtocol(name: $name, blockchainName: $blockchainName) {
    protocol {
      name
    }
    errors {
      message
    }
}}`;
export const createPool = `mutation($poolAddress: String!, $protocolName: String!, $token0: String!,$token1: String!, $apr: Float!, $tvl: Float!,$weight: Float!) {
  addPool(input: { poolAddress:$poolAddress,protocolName: $protocolName, token0: $token0, token1: $token1, apr: $apr, tvl: $tvl,weight: $weight }) {
    pool {
      poolName
    }
    errors{
      message
    }
  }
}`;

export const getPoolsByProtocolId = `query($protocolId: Float!)  {
  poolsByProtocolId(protocolId: $protocolId) {
    poolName
    weight
    apr
  }
}`;

export const updateProtocol = `mutation($protocolId: Float!, $apr: Float!, $risk: Float!,$weight: Float! ){
  updateProtocol(protocolId: $protocolId,apr: $apr, risk: $risk,weight: $weight)
}`;

export const updateWeightProtocol = `mutation($protocolName: String!,$weight: Float! ){
  updateWeightProtocol(protocolName: $protocolName,weight: $weight)
}`;
export const updateWeightBlockchain = `mutation($blockchainName: String!,$weight: Float! ){
  updateWeightBlockchain(blockchainName: $blockchainName,weight: $weight)
}`;

export const updatePool = `mutation($protocolId: Float!, $poolAddress: String!, $weight: Float! ){
  updatePool(protocolId: $protocolId, poolAddress:$poolAddress, weight: $weight)
}`;

export const updateBlockchain = `mutation($blockchainName: String!, $apr: Float!, $risk: Float! ){
  updateBlockchain(blockchainName: $blockchainName, apr:$apr, risk: $risk)
}`;
export const updateTimestamp = `mutation($apr: Float!, $risk: Float! ){
  updateTimestamp( apr:$apr, risk: $risk)
}`;

export const getProtocolLast = `query{
	protocolLast{
		id
	}
}`;

export const getLastProtocolByBCName = `query($blockchainName: String!) {
	lastProtocolByBCName(blockchainName: $blockchainName) {
    apr
    weight
    risk
	}
}`;
export const getLastBCByName = `query($blockchainName: String!) {
	lastBCByBCName(blockchainName: $blockchainName) {
    apr
    weight
    risk
	}
}`;

export const getProtocolsLastTS = `query{
	protocolsLastTS{
		id
    name
    blockchain {
      name
    }
    pools {
      apr
      weight
    }
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
