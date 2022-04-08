import { initialFetching } from "./steps/step0";
import { protocolLayerResults } from "./steps/step1";
import { blockchainLayerResults } from "./steps/step2";
import { farmingResults } from "./steps/step3";

export const dailyUpdate = async () => {
	console.log("#################### BEGIN DAILY UPDATE ####################");
	/* 
		step 0: fetch data and initialize DB for the current iteration
		- fetch data from Zapper
		- create new Timestamp
		- create new Blockchain for each blockchain
		- create new Protocol for each protocol
		- create new Pool for each pool
	 */
	await initialFetching();

	/* 
		step 1: calculate pool weights
		- run python script to get weights of each pool inside each protocol
		- update weight value for each pool in DB
	 */
	await protocolLayerResults();
	/* 
		step 2: calculate protocol weights
		- calculate protocol weights for each blockchain
		- update weight value for each protocol in DB 
		- calculate apr + risk values for each blockchain
		- update apr + risk values for each blockchain
	 */
	await blockchainLayerResults();

	/* 
		step 3: calculate blockchain weights
		- calculate weights of each blockchains for farming
		- update weight value for each blockchain in DB 
		- calculate apr + risk values for farming
		- update apr + risk values for farming
	 */
	await farmingResults();

	console.log("#################### END DAILY UPDATE ####################");
};

dailyUpdate();
