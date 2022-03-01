import fetch from "node-fetch";

const feedDailyData = async () => {
	const token = "uusd";
	const data = await fetch(
		`https://eth-api.anchorprotocol.com/api/v1/stablecoin_info/${token}`
	);
	return data.json();
};

export default feedDailyData;
