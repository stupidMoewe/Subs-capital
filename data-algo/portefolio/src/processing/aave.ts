// post processing of data

const dataset = require("../../src/data/aave.csv");

const meanCalculate = () => {
	console.log(dataset);
	return "test";
};

export default () => {
	// TODO
	// pour chacune des cryptos:

	// calculer mean sur l'annee
	meanCalculate();

	// calculer ecart-type = standart deviation
	// moyenne ponderee
	// correlation
};
