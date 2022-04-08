import { ApolloServer } from "apollo-server-express";
import "dotenv-safe/config";
import cors from "cors";
import express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { BlockchainResolver } from "./resolvers/blockchain";
import { PoolResolver } from "./resolvers/pool";
import { ProtocolResolver } from "./resolvers/protocol";
import { TimestampResolver } from "./resolvers/timestamp";
// import path from "path";

const main = async () => {
	let retries = 10;
	while (retries) {
		try {
			await createConnection({
				type: "postgres",
				url: process.env.DATABASE_URL,
				synchronize: true,
				logging: true,
				migrations: ["dist/migrations/*"],
				entities: ["dist/entity/*.*"],
			});
			// 			{
			// 	"type": "postgres",
			// 	"host": "localhost",
			// 	"port": 5432,
			// 	"username": "postgres",
			// 	"password": "postgres",
			// 	"database": "subs2",
			// 	"entities": ["dist/entity/*.js"],
			// 	"migrations": ["dist/migrations/*.js"]
			// }
			// await conn.runMigrations();
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
	// await conn.runMigrations();
	const app = express();

	app.use(
		cors({
			origin: [
				process.env.CORS_ORIGIN_FE,
				process.env.CORS_ORIGIN_DM,
				"https://www.subs-capital.fr",
			],
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

	app.listen(parseInt(process.env.PORT), () => {
		console.log("server started on localhost:4000");
	});
};

main().catch((err) => {
	console.error(err);
});
