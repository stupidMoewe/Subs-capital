import cron from "node-cron";

// Schedule tasks to be run on the server.
cron.schedule("* * * * *", function () {
	console.log("running a task every minute");
	console.log("test");
});

cron.schedule("0 3 * * *", function () {
	console.log("running a task every day at 3 o'clock");
});

// export const getApolloServerClient = () =>
// 	new ApolloClient({
// 		ssrMode: true,

// 		cache: new InMemoryCache(),

// 		// link: new SchemaLink({ schema }),
// 	});
// getApolloServerClient();
