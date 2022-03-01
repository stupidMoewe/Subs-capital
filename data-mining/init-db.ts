import fetch from "node-fetch";

const url = `http://localhost:4000/graphql`;

import constants from "./variables.json";

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
  }
}
`;

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
			console.log(data);
			return data;
		});
	return data;
};

export const dailyUpdate = async () => {
	// create new TS
	await callGraphQL(createTS);

	// add BCs and protocols
	const blockchains = constants.blockchains;
	const protocols = constants.protocols;
	const poolsAddress = constants.poolsAddress;

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
		}
	}

	for (const [index, BC] of blockchains.entries()) {
		console.log("BC: ", BC, poolsAddress[index][BC]);
		// for (const protocol of poolsAddress[BC]) {
		// 	console.log(protocol);
		// }
	}

	// fetch pools data from data-mining
	// calculate weights
	// store pools
};
