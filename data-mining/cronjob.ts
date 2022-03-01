const fs = require("fs");
const cron = require("node-cron");

const testFile = "./data/test.json";
const anchorFile = "./data/anchor.json";
import feedDailyData from "./src/populate/lending/anchor";

let variable = 1;

const populateFileHelper = (fileName, data) => {
	let newArray: object[] = [];
	const readFile = fs.readFileSync(fileName);
	const oldArray = JSON.parse(readFile);
	if (oldArray.length == 0) {
		newArray.push(data);
		const newData = JSON.stringify(newArray);
		fs.writeFileSync(fileName, newData);
	} else {
		const array = oldArray;
		array.push(data);
		const newData = JSON.stringify(array);
		fs.writeFileSync(fileName, newData);
	}
};

const populateTest = () => {
	const data: object = {
		newData: "test",
	};

	populateFileHelper(testFile, data);
};

const populateAnchor = async () => {
	const dataFetched = await feedDailyData();
	const apyFetched = dataFetched.current_apy;

	const data: object = {
		token: "uusd",
		apy: apyFetched,
		date: Date.now(),
	};

	populateFileHelper(anchorFile, data);
};

cron.schedule("* * * * *", async function () {
	console.log("running a task every minute. Iteration number: ", variable);
	fs.appendFile(testFile, JSON.stringify({ test: variable }), (err) => {
		console.log(err);
	});
	await populateAnchor();
	variable++;
});
//populateTest();
populateAnchor();
