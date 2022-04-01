import {
	Arg,
	Field,
	InputType,
	Int,
	Mutation,
	Query,
	Resolver,
} from "type-graphql";
import { Pool } from "../entity/Pool";
import { Protocol } from "../entity/Protocol";
import { Timestamp } from "../entity/Timestamp";
import { PoolResponse } from "../types/graph";

@InputType()
class PoolInput {
	@Field()
	poolAddress: string;
	@Field()
	protocolName: string;
	@Field()
	token0: string;
	@Field()
	token1: string;
	@Field()
	apr: number;
	@Field()
	tvl: number;
}

@Resolver(Pool)
export class PoolResolver {
	relations = ["protocol", "timestamp"];

	@Query(() => [Pool], { nullable: true })
	async pools() {
		return Pool.find({ relations: this.relations });
	}

	@Query(() => Pool, { nullable: true })
	async poolById(@Arg("id", () => Int) id: number) {
		return Pool.findOne(id);
	}

	@Query(() => Pool, { nullable: true })
	async poolByProtocolId(@Arg("protocolId", () => Int) protocolId: number) {
		return Pool.find({ where: { protocol: { id: protocolId } } });
	}

	@Query(() => [Pool])
	async dailyPools() {
		const d = new Date();
		const midnightTimestamp = d.setHours(0, 0, 0, 0);
		const pools = await Pool.find();
		return pools.filter((p) => p.createdAt.getTime() > midnightTimestamp);
	}

	@Mutation(() => PoolResponse)
	async addPool(@Arg("input") input: PoolInput): Promise<PoolResponse> {
		let poolCreated;
		try {
			const currentTS = await Timestamp.findOne({
				order: { id: "DESC" },
			});

			// check if existing protocol => we need to have one
			const currentProtocol = await Protocol.findOne({
				where: {
					timestamp: { id: currentTS?.id },
					name: input.protocolName,
				},
			});
			if (!currentProtocol) throw new Error();

			// check if existing pool with same id
			const existingPool = await Pool.findOne({
				where: {
					poolAddress: input.poolAddress,
					protocol: currentProtocol,
				},
			});
			if (existingPool) throw new Error();

			const poolName = input.token0 + "-" + input.token1;
			poolCreated = await Pool.create({
				poolName,
				protocol: currentProtocol,
				token0: input.token0,
				token1: input.token1,
				apr: input.apr,
				tvl: input.tvl,
				timestamp: currentTS,
				poolAddress: input.poolAddress,
			}).save();
		} catch (err) {
			console.log(err);
			return {
				errors: [
					{
						field: "",
						message: "Could not save the pool",
					},
				],
			};
		}
		return { pool: poolCreated };
	}

	@Mutation(() => Boolean)
	async updatePool(
		@Arg("poolAddress") poolAddress: string,
		@Arg("protocolId") protocolId: number,
		@Arg("weight") weight: number
	): Promise<Boolean> {
		try {
			const pool = await Pool.findOne({
				where: {
					protocol: { id: protocolId },
					poolAddress,
				},
			});
			console.log(weight);
			const weightParsed = Math.floor(weight * 10 ** 8);
			pool!.weight = weightParsed;
			await pool!.save();
		} catch (err) {
			return false;
		}
		return true;
	}
}

/* 
Pool Structure

BC
    Protocole
        Pool => chaque pool sera representee ts les jours avec current apr

*/
