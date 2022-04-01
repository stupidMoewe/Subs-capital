export const calculateApr = (
	fee: number,
	volume: number,
	liquidity: number
): number => {
	const netApr = (fee * volume * 365) / liquidity;
	return Math.round(netApr * 10 ** 8);
};
