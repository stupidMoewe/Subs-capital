import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { BlockchainResolver } from "./resolvers/blockchain";
import { PoolResolver } from "./resolvers/pool";
import { ProtocolResolver } from "./resolvers/protocol";
import { TimestampResolver } from "./resolvers/timestamp";

const main = async () => {
	let retries = 10;
	while (retries) {
		try {
			await createConnection();
			break;
		} catch (err) {
			console.log(err);
			retries -= 1;
			console.log(`${retries} retries remaining...`);
			// wait 5 seconds before retrying connection to
			// postgres
			await new Promise((res) => {
				setTimeout(res, 5000);
			});
		}
	}
	//await conn.runMigrations();
	const app = express();

	app.use(
		cors({
			origin: "http://localhost:5000",
			credentials: true,
		})
	);

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [
				PoolResolver,
				ProtocolResolver,
				BlockchainResolver,
				TimestampResolver,
			],
			validate: false,
		}),
		context: ({ req, res }) => ({ req, res }),
	});

	apolloServer.applyMiddleware({ app, cors: false });

	app.listen(4000, () => {
		console.log("server started on localhost:4000");
	});
};

main();
//.catch((err) => {
// 	console.error(err);
// });
