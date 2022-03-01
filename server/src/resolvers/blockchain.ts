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
}
