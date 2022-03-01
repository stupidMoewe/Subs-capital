// import { estimatedFees } from "./scripts/calculate-fees";
import { getPoolFromPair, getTokenList } from "./scripts/uniswap-v3";

const initialFetching = async () => {
	console.log("hello");

	// 1. Fetch Data
	const test = await getTokenList();
	console.log(test);
	const test2 = await getPoolFromPair(test[0], test[1]);
	console.log(test2);



    
	// const fee = estimatedFees();
	// 2. Calculates apr for each pool
	// 3. Store pools into DB
};

initialFetching();
