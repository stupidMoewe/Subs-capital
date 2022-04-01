import cron from "node-cron";
import { dailyUpdate } from "./src";

console.log("Excecuting initial update");

let i = 1;
cron.schedule("0 2 * * *", async function () {
	console.log("running a task every day");
	console.log("task nb : ", i);
	i++;
	await dailyUpdate();
});
let j = 1;
cron.schedule("* * * * *", async function () {
	console.log("running a task every minuite");
	console.log("task nb : ", j);
	j++;
	await dailyUpdate();
});