import { AAVE_API_BASE_URL } from "../../constants";
import { POOL_IDS } from "../../constants";
import { AAVE_CONSIDERED_TOKENS } from "../../constants";
import fetch from "node-fetch";
const fs = require("fs");

const fetchDataAave = async (date) => {
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	const parsedDate = `${month}-${day}-${year}`;
	const data = await fetch(
		`${AAVE_API_BASE_URL}/data/liquidity/v2?poolId=${POOL_IDS.V2}&date=${parsedDate}`
	);

	const response: any = await data.json();
	const dailyAvgs: object[] = [];
	response.map((r) => {
		console.log(r);
		if (AAVE_CONSIDERED_TOKENS.includes(r.name)) {
			const object = new Object({
				name: r.name,
				date,
				isActive: r.isActive,
				avg: r.avg1DaysLiquidityRate,
				variableBorrowRate: r.stableBorrowRate,
				optimalUtilisationRate: r.optimalUtilisationRate,
				borrowingEnabled: r.borrowingEnabled,
				availableLiquidity: r.availableLiquidity,
				usageAsCollateralEnabled: r.usageAsCollateralEnabled,
				baseLTVasCollateral: r.baseLTVasCollateral,
			});
			dailyAvgs.push(object);
		}
	});

	return dailyAvgs;
};

const fetchAndMergeAllData = async () => {
	var now = new Date();
	var daysOfYear: Date[] = [];
	for (var d = new Date(2021, 11, 30); d <= now; d.setDate(d.getDate() + 1)) {
		daysOfYear.push(new Date(d));
	}
	const allData: object[] = [];
	daysOfYear.pop();
	for (let date of daysOfYear) {
		console.log(date);
		const dailyAvrgs = await fetchDataAave(date);
		allData.push(dailyAvrgs);
	}
	fs.writeFile("./data/aave.json", JSON.stringify(allData), (err: any) => {
		console.log(err);
	});
};

const populateDataAave = async () => {
	fetchAndMergeAllData();
};

export default populateDataAave;
