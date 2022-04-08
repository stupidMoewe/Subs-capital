import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Blockchain } from "../entity/Blockchain";
import { Timestamp } from "../entity/Timestamp";
import { BlockchainResponse } from "../types/graph";

@Resolver(Blockchain)
export class BlockchainResolver {
	relations = ["protocols"];

	@Query(() => [Blockchain])
	async blockchains() {
		return Blockchain.find({
			relations: this.relations,
			order: { id: "DESC" },
		});
	}

	@Query(() => [Blockchain])
	async blockchainLastTS() {
		const currentTS = await Timestamp.findOne({
			order: { id: "DESC" },
		});
		return Blockchain.find({
			relations: this.relations,
			where: {
				timestamp: { id: currentTS?.id },
			},
			order: { id: "DESC" },
		});
	}

	@Query(() => Blockchain)
	async blockchainByName(@Arg("name") name: string) {
		return Blockchain.findOne({ name }, { relations: this.relations });
	}

	@Query(() => Blockchain)
	async lastBCByBCName(@Arg("blockchainName") blockchainName: string) {
		// const lastTS = await Timestamp.findOne({ order: { id: "DESC" } });
		return Blockchain.findOne({
			relations: this.relations,
			order: {
				id: "DESC",
			},
			where: {
				name: blockchainName,
			},
		});
	}

	@Mutation(() => BlockchainResponse)
	async addBlockchain(
		@Arg("name") name: string
	): Promise<BlockchainResponse> {
		let blockchain;
		try {
			// need to manually check if for the current timestanp a BC with the same name already exists
			const currentTS = await Timestamp.findOne({
				order: { id: "DESC" },
			});
			const existingBC = await Blockchain.find({
				where: { timestamp: { id: currentTS?.id }, name },
			});
			console.log(existingBC);
			if (existingBC.length) throw new Error();
			blockchain = await Blockchain.create({
				name,
				timestamp: currentTS,
			}).save();
		} catch (err) {
			return {
				errors: [
					{ field: "", message: "could not save this blockchain" },
				],
			};
		}
		return { blockchain };
	}

	@Mutation(() => Boolean)
	async updateBlockchain(
		@Arg("blockchainName") blockchainName: string,
		@Arg("apr") apr: number,
		@Arg("risk") risk: number
	): Promise<Boolean> {
		try {
			const aprParsed = Math.floor(apr);
			const riskParsed = Math.floor(risk );

			const lastTS = await Timestamp.findOne({ order: { id: "DESC" } });

			await Blockchain.update(
				{ name: blockchainName, timestamp: { id: lastTS?.id } },
				{
					apr: aprParsed,
					risk: riskParsed,
				}
			);
		} catch (err) {
			console.log("error update protocol: ", err);
			return false;
		}
		return true;
	}

	@Mutation(() => Boolean)
	async updateWeightBlockchain(
		@Arg("blockchainName") blockchainName: string,
		@Arg("weight") weight: number
	): Promise<Boolean> {
		try {
			const weightParsed = Math.floor(weight);
			await Blockchain.update(
				{ name: blockchainName },
				{
					weight: weightParsed,
				}
			);
		} catch (err) {
			console.log("error update weight blockchain: ", err);
			return false;
		}
		return true;
	}
}
