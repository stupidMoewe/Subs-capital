export const calculateApr = (
	fee: number,
	volume: number,
	liquidity: number
): number => {
	const netApr = (fee * volume * 365) / liquidity;
	return Math.round(netApr * 10 ** 8);
};

export const calculateAprRiskGlobal = (
	aprList: number[],
	weightsList: number[],
	risksList: number[]
): number[] => {
	console.log("##### 1 ##### ", aprList, weightsList, risksList);
	let globalApr = 0;
	let squareGlobalRisk = 0;
	let num = 0;
	const weights = weightsList.map((w) => w / 10 ** 8);
	console.log("weightsList : ", weights);
	for (const i in aprList) {
		globalApr += aprList[i] * weights[i];
		squareGlobalRisk += risksList[i] ** 2 * weights[i];
		num += squareGlobalRisk;
	}
	//const nbOfNonZeroWeights = weightsList.filter((w) => w != 0).length;
	const globalRisk =
		(num / weightsList.reduce((partialSum, a) => partialSum + a, 0)) *
		10 ** 8;

	console.log("##### 2 ##### ", globalApr, Math.floor(Math.sqrt(globalRisk)));
	return [globalApr, Math.floor(Math.sqrt(globalRisk))];
};
