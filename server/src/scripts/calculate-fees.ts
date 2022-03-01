// import bn from "bignumber.js";
// import {
// 	calculateFee,
// 	getLiquidityForAmounts,
// 	getSqrtPriceX96,
// 	getTickFromPrice,
// 	getTokenAmountsFromDepositAmounts,
// } from "../utils/liquidityMath";
// import { Tick } from "./uniswap-v3";

// export const estimatedFees = (
// 	priceAssumptionValue,
// 	priceRangeValue,
// 	token1PriceChart,
// 	token0PriceChart
// ) => {
// 	const calculateLiquidity = (ticks: Tick[], currentTick: number): bn => {
// 		if (ticks.length <= 1) return new bn(0);
// 		let liquidity: bn = new bn(0);
// 		for (let i = 0; i < ticks.length - 1; ++i) {
// 			liquidity = liquidity.plus(new bn(ticks[i].liquidityNet));

// 			let lowerTick = Number(ticks[i].tickIdx);
// 			let upperTick = Number(ticks[i + 1].tickIdx);

// 			if (lowerTick <= currentTick && currentTick <= upperTick) {
// 				break;
// 			}
// 		}

// 		return liquidity;
// 	};

// 	const P = priceAssumptionValue;
// 	const Pl = priceRangeValue[0];
// 	const Pu = priceRangeValue[1];
// 	const priceUSDX = token1PriceChart?.currentPriceUSD || 1;
// 	const priceUSDY = token0PriceChart?.currentPriceUSD || 1;
// 	const targetAmounts = depositAmountValue;

// 	const { amount0, amount1 } = getTokenAmountsFromDepositAmounts(
// 		P,
// 		Pl,
// 		Pu,
// 		priceUSDX,
// 		priceUSDY,
// 		targetAmounts
// 	);

// 	const sqrtRatioX96 = getSqrtPriceX96(
// 		P,
// 		state.token0?.decimals || "18",
// 		state.token1?.decimals || "18"
// 	);
// 	const sqrtRatioAX96 = getSqrtPriceX96(
// 		Pl,
// 		state.token0?.decimals || "18",
// 		state.token1?.decimals || "18"
// 	);
// 	const sqrtRatioBX96 = getSqrtPriceX96(
// 		Pu,
// 		state.token0?.decimals || "18",
// 		state.token1?.decimals || "18"
// 	);

// 	const deltaL = getLiquidityForAmounts(
// 		sqrtRatioX96,
// 		sqrtRatioAX96,
// 		sqrtRatioBX96,
// 		amount0,
// 		Number(state.token1?.decimals || 18),
// 		amount1,
// 		Number(state.token0?.decimals || 18)
// 	);

// 	let currentTick = getTickFromPrice(
// 		P,
// 		state.token0?.decimals || "18",
// 		state.token1?.decimals || "18"
// 	);

// 	if (state.isSwap) currentTick = -currentTick;

// 	const L = calculateLiquidity(state.poolTicks || [], currentTick);
// 	const volume24H = state.volume24H;
// 	const feeTier = state.pool?.feeTier || "";

// 	let fee = calculateFee(deltaL, L, volume24H, feeTier);
// 	if (P < Pl || P > Pu) fee = 0;

// 	return fee;
// };
