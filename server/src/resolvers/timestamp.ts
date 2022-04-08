import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Timestamp } from "../entity/Timestamp";
import { TimestampResponse } from "../types/graph";

@Resolver(Timestamp)
export class TimestampResolver {
	relations = ["blockchains", "tokens"];

	@Query(() => Timestamp, { nullable: true })
	async timestamp(@Arg("id", () => Int) timestampId: number) {
		return Timestamp.findOne(timestampId, { relations: this.relations });
	}

	@Query(() => Timestamp, { nullable: true })
	async lastTimestamp() {
		return Timestamp.findOne({
			relations: this.relations,
			order: { id: "DESC" },
		});
	}

	@Query(() => [Timestamp], { nullable: true })
	async timestamps() {
		return Timestamp.find({
			relations: this.relations,
			order: { id: "DESC" },
		});
	}

	@Mutation(() => TimestampResponse)
	async newTimestamp(): Promise<TimestampResponse> {
		let timestamp;
		const currentTime = new Date();
		try {
			const prevTS = await Timestamp.findOne({
				order: { id: "DESC" },
			});
			if (prevTS) {
				prevTS.endTime = currentTime;
			}
			await prevTS?.save();
			timestamp = await Timestamp.create({
				beginTime: currentTime,
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
		return { timestamp };
	}

	@Mutation(() => Boolean)
	async updateTimestamp(
		@Arg("risk") risk: number,
		@Arg("apr") apr: number
	): Promise<Boolean> {
		const riskParsed = Math.floor(risk); const aprParsed = Math.floor(apr);
		let lastTS;
		try {
			lastTS = await Timestamp.findOne({ order: { id: "DESC" } });
			if (lastTS) {
				lastTS.apr = aprParsed;
				lastTS.risk = riskParsed;
			}
			lastTS?.save();
		} catch (err) {
			console.log("error update protocol: ", err);
			return false;
		}
		return true;
	}
}
