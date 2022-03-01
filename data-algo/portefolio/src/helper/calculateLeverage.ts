type ResultType = {
	leveragedAPR: number;
	leverageMultiplicator: number;
	numberOfRoundsDone: number;
};

const calculateLeverage = (
	lendingAPR: number,
	borrowAPR: number,
	ratio: number,
	limit: number
): ResultType => {

// recuperer valeur gas

// si ratio somme totale/prix gas => 0.01%?


	let leveragedAPR = 0;
	let numberOfRoundsDone = 0;

	let sumInitial = 1;
	let leftSum = sumInitial;

	let lendedSum = 0;

	// 1st supply
	lendedSum += sumInitial;
	let collateralAvailable = lendedSum;
	leveragedAPR += lendingAPR * sumInitial;
	leftSum = 0;

	while (numberOfRoundsDone < 10) {
		// each time 1 borrow and 1 supply

		// 1 borrow
		let borrowed = collateralAvailable;
		collateralAvailable = 0;
		leftSum = ratio * borrowed;
		leveragedAPR -= borrowAPR * borrowed;

		// 1 lending
		let lend = leftSum;
		leftSum = 0;
		lendedSum += lend;
		leveragedAPR += lendingAPR * lend;
		collateralAvailable += lend;

		numberOfRoundsDone++;
	}

	const results = {
		lendingAPR,
		borrowAPR,
		leveragedAPR,
		leverageMultiplicator: leveragedAPR / lendingAPR,
		numberOfRoundsDone,
	};
	return results;
};

export default calculateLeverage;
