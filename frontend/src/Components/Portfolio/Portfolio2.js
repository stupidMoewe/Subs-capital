import Bottom from "Components/MainPage/Bottom";
import Header from "Components/MainPage/Header";
import Button3 from "HOC/button3";
import React, { useEffect, useState, useMemo, Component } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import Box2 from "../Box/Box2";
import BoxesContainer from "../Box/BoxesContainer";
import courbureBlue from "../../images/Courbure-bleue.png";
import courbureJaune from "../../images/Courbure-jaune.png";
import nextIcon from "../../images/Fortnite_Outline.png";
import instaImage from "../../images/Instagram_Monochromatic.png";
import twitterImage from "../../images/Twitter_Monochromatic.png";

const url = `http://localhost:4000/graphql`; //https://www.subs-capital.fr/graphql

const getProtocol = `query{
	protocolLast{
		id
   		name
    	risk
    	apr
    	pools{
      		poolName
      		weight
      		apr
      		tvl
    	}
  	}
}`;

const callGraphQL = async (query, variables = {}) => {
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

const calculWeightsTokens = (pools) => {
	const tokensWeights = [];
	pools.map((pool) => {
		if (pool.weight != 0) {
			const [token0, token1] = pool.poolName.split("-");
			let isToken0Registered = false;
			let isToken1Registered = false;
			for (let e of tokensWeights) {
				if (e.tokenName === token0) {
					e.weight += pool.weight / 2;
					isToken0Registered = true;
				} else if (e.tokenName === token1) {
					e.weight += pool.weight / 2;
					isToken1Registered = true;
				}
			}
			if (!isToken0Registered) {
				tokensWeights.push({
					tokenName: token0,
					weight: pool.weight / 2,
				});
			}
			if (!isToken1Registered) {
				tokensWeights.push({
					tokenName: token1,
					weight: pool.weight / 2,
				});
			}
		}
	});
	const tokensName = [];
	const tokensData = [];
	tokensWeights.map((token) => {
		tokensName.push(token.tokenName);
		tokensData.push(token.weight / 10 ** 8);
	});
	return [tokensName, tokensData];
};

class Portfolio2 extends Component {
	state = {
		pools: [],
		tokensData: [],
	};
	componentWillMount() {
		callGraphQL(getProtocol)
			.then((res) => {
				this.setState({ pools: res.data.protocolLast.pools });
			})
			.then(() => {
				this.setState({
					tokensData: calculWeightsTokens(this.state.pools),
				});
			});
	}
	render() {
		//console.log("dataFarmEth: ", dataFarmEthPools, hasError);
		// const dataFarmEthPools = [];
		// const [loading, setLoading] = useState(true);
		// // const [dataFarmEthPools, setDataFarmEth] = useState([]);
		// //const [tokensWeights, setTokensWeights] = useState([]);
		// useEffect(() => {
		// 	// 	if (dataFarmEthPools)
		// 	// 		setTokensWeights(calculWeightsTokens(dataFarmEthPools));
		// }, [loading]);
		// setLoading(false);
		//const tokensWeights = calculWeightsTokens(dataFarmEthPools);
		//console.log("tokensWeights: ", tokensWeights);
		const protocols = {
			sushiswap: { labels: [], data: [] },
		};

		// populate data for pools for each protocol
		this.state.pools?.map((pool) => {
			protocols.sushiswap.labels.push(pool.poolName);
			protocols.sushiswap.data.push(pool.weight / 10 ** 8);
		});

		const backgroundColor = [
			"rgb(95, 116, 211)",
			"rgb(77, 144, 206)",
			"rgb(39, 198, 196)",
			"rgb(20, 225, 191)",
			"rgb(130, 177, 195)",
			"rgb(185, 153, 197)",
			"rgb(239, 128, 198)",
			"rgb(243, 151, 177)",
			"rgb(247, 174, 155)",
			"rgb(251, 197, 134)",
			"rgb(255, 219, 112)",
			"rgb(95, 116, 211)",
			"rgb(77, 144, 206)",
			"rgb(39, 198, 196)",
			"rgb(20, 225, 191)",
			"rgb(130, 177, 195)",
			"rgb(185, 153, 197)",
			"rgb(239, 128, 198)",
			"rgb(243, 151, 177)",
			"rgb(247, 174, 155)",
			"rgb(251, 197, 134)",
			"rgb(255, 219, 112)",
		];

		const sushiswapData = {
			labels: protocols.sushiswap.labels,
			datasets: [
				{
					data: protocols.sushiswap.data,
					label: "Pools",
					backgroundColor,
					overOffset: 4,
				},
			],
		};

		const tokensData = {
			labels: this.state.tokensData[0],
			datasets: [
				{
					data: this.state.tokensData[1],
					label: "Proportion totale",
					backgroundColor,
					overOffset: 4,
				},
			],
		};
		const options = {
			legend: {
				display: true,
				position: "bottom",
			},
			maintainAspectRatio: false,
		};
		const optionsBar = {
			legend: {
				display: false,
			},
			scales: {
				yAxes: [
					{
						ticks: {
							beginAtZero: true,
							min: 0,
						},
					},
				],
			},
		};
		return (
			<div className="mainpage">
				<Header
					btnType="white"
					linkTo="/choix"
					logoType="blue"
					headerFixed={false}
					// style={{ position: "sticky", zIndex: 1 }}
				/>
				<div className="portfolio">
					<div className="portfolio__container">
						<BoxesContainer mobileBreak={true}>
							<Box2 flex={2} bgColor={"rgba(0, 172, 238, 0.29)"}>
								<div className="flex-col">
									<h3>
										<b>
											Retrouvez toutes les informations
											sur
											<br />
											notre compte Twitter !
										</b>
									</h3>
									<div style={{ color: "gray" }}>
										Mise a jour quotidienne
									</div>
									<div className="social-btn__box">
										<Button3
											color={"twitter"}
											size={"small"}
											linkTo={
												"https://twitter.com/SubsCapital?ref_src=twsrc%5Etfw"
											}
											newTab={true}
										>
											Suivez-nous
										</Button3>
									</div>
								</div>
								<div className="social-image">
									<img
										src={twitterImage}
										className="portfolio__twitter-img"
									/>
								</div>
							</Box2>
							<Box2 flex={1} bgColor={"rgba(188, 42, 141, 0.29)"}>
								<div className="flex-col">
									<h3>
										<b>
											Egalement sur <br />
											Instagram
										</b>
									</h3>
									<div className="social-btn__box">
										<Button3
											color={"instagram"}
											size={"small"}
											linkTo={
												"https://www.instagram.com/subscapital/"
											}
											newTab={true}
										>
											Suivez-nous
										</Button3>
									</div>
								</div>
								<div className="social-image">
									<img
										src={instaImage}
										className="portfolio__twitter-img"
									/>
								</div>
							</Box2>
						</BoxesContainer>
						{/* <BoxesContainer nbOfBoxes={1}>
						<Box2 flex={1}></Box2>
					</BoxesContainer>
					<BoxesContainer nbOfBoxes={3}>
						<Box2 flex={3}></Box2>
						<Box2 flex={3}></Box2>
						<Box2 flex={3}></Box2>
					</BoxesContainer> */}
						<br />
						<br />
						<h1 style={{ color: "#595959" }}>
							<b>
								<i>Portfolio de Subs</i>
							</b>
						</h1>
						<br />
						<BoxesContainer>
							<Box2 flex={3} ftColor={"blue"}>
								<div className="subBox" style={{ zIndex: 1 }}>
									<h3>Rendement annuel</h3>
									<span>10%</span>
									<div>
										7,5%{" "}
										<small>
											de plus que l'épargne moyenne en
											France
										</small>
									</div>
								</div>
								<div className="courbe">
									<img src={courbureBlue} />
								</div>
							</Box2>
							<Box2 flex={3} ftColor={"yellow"}>
								<div className="subBox" style={{ zIndex: 1 }}>
									<h3>Volatilité</h3>
									<span title="Volatilité faible">2.2%</span>
									<div>
										<small>
											Faible volatilité (entre 0% et 10%)
										</small>
									</div>
								</div>
								<div className="courbe">
									<img src={courbureJaune} />
								</div>
							</Box2>
							<Box2 flex={3} ftColor={"blue"}>
								<div className="subBox" style={{ zIndex: 1 }}>
									<h3>Exposition Max</h3>
									<span>38%</span>
									<br />
									<div>
										<small>
											Exposition maximale de notre
											portefolio
										</small>
									</div>
								</div>
								<div className="courbe">
									<img src={courbureBlue} />
								</div>
							</Box2>
						</BoxesContainer>

						{/* <h2>
						<b>
							Nos positions indicatives sur la Blockchain Ethereum
						</b>
					</h2> */}
						<BoxesContainer>
							<Box2 flex={2}>
								<div className="subBox">
									<h3 className="subBox__title">
										Poids de chaques pools sur Sushiswap
										(Ethereum){" "}
									</h3>
									<div className="chart-box">
										<Doughnut
											height="300px"
											width="300px"
											data={sushiswapData}
											options={options}
										/>
									</div>
								</div>
							</Box2>
						</BoxesContainer>
						<BoxesContainer>
							<Box2 flex={1}>
								<div className="subBox">
									<h3 className="subBox__title">
										Positions globales des tokens dans les
										pools (en %)
									</h3>
									<div className="chart-box">
										<Bar
											data={tokensData}
											height={100}
											options={optionsBar}
										/>
									</div>
								</div>
							</Box2>
						</BoxesContainer>
						{/* <h2>
						Bientôt plus de protocoles et d'autres chaines!{" "}
						<Emoji symbol={"0x1F680"} width={"20px"} />
					</h2> */}
						<BoxesContainer>
							<Box2
								flex={1}
								bgColor={"rgba(255, 198, 0, 0.4)"}
								ftColor={"white"}
							>
								<div className="flex-col">
									<h3>
										<b>Coming soon !</b>
									</h3>
									<div style={{ color: "gray" }}>
										Bientot plus de chaines et de protocoles
									</div>

									<div className="subBox__upcoming-events-container">
										<div className="subBox__upcoming-events">
											<p>Uniswap V2</p>
											<small>(Ethereum)</small>
										</div>
										<div className="subBox__upcoming-events">
											<p>Uniswap V3</p>
											<small>(Ethereum)</small>
										</div>
										<div className="subBox__upcoming-events">
											Blockchaine <br />
											Polygone
										</div>
									</div>
								</div>
								<div
									className="social-image display-none-mobile"
									style={{ width: "22rem" }}
								>
									<img
										src={nextIcon}
										className="portfolio__twitter-img"
									/>
								</div>
								{/* <div className="social-image">
								<img
									src={instaImage}
									className="portfolio__twitter-img"
								/>
							</div> */}
							</Box2>
						</BoxesContainer>

						{/* <div className="flex-row">
						<Box displayRow={false}>
							<h4 style={{ color: "inherit" }}>
								Uniswap V2 (Ethereum)
							</h4>
							<p>Coming Soon</p>
						</Box>
						<Box displayRow={false}>
							<h4 style={{ color: "inherit" }}>
								Uniswap V3 (Ethereum)
							</h4>
							<span>Coming Soon</span>
						</Box>
						<Box displayRow={false}>
							<h4 style={{ color: "inherit" }}>
								Blockchaine Polygone
							</h4>
							<span>Coming Soon</span>
						</Box>
					</div> */}
						<div style={{ margin: "5rem auto" }}>
							<h2>Préinscrivez-vous dès maintenant!</h2>
							<br />
							<span style={{ maxWidth: "20rem", margin: "auto" }}>
								<Button3 linkTo="/choix">
									Préinscription
								</Button3>
							</span>
						</div>
					</div>
				</div>
				<Bottom></Bottom>
				<div className="bottomLine"></div>
			</div>
		);
	}
}

export default Portfolio2;
