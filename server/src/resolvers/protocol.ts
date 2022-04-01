import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Blockchain } from "../entity/Blockchain";
import { Protocol } from "../entity/Protocol";
import { Timestamp } from "../entity/Timestamp";
import { ProtocolResponse } from "../types/graph";

@Resolver(Protocol)
export class ProtocolResolver {
	relations = ["blockchain", "pools"];

	@Query(() => [Protocol])
	async protocols() {
		return Protocol.find({
			relations: this.relations,
			order: {
				id: "DESC",
			},
		});
	}

	@Query(() => Protocol)
	async protocolById(@Arg("id", () => Int) protocolId: number) {
		return Protocol.findOne(protocolId, { relations: this.relations });
	}

	@Query(() => Protocol)
	async protocolLast() {
		return Protocol.findOne({
			relations: this.relations,
			order: {
				id: "DESC",
			},
		});
	}

	@Mutation(() => ProtocolResponse)
	async addProtocol(
		@Arg("name") name: string,
		@Arg("blockchainName") blockchainName: string
	): Promise<ProtocolResponse> {
		let protocol;
		try {
			const currentTS = await Timestamp.findOne({
				order: { id: "DESC" },
			});

			// check if existing BC => we need to have one
			const currentBC = await Blockchain.findOne({
				where: {
					timestamp: { id: currentTS?.id },
					name: blockchainName,
				},
			});
			if (!currentBC) throw new Error();

			// check if already existing protocol => we need to have none
			const existingProtocol = await Protocol.findOne({
				where: {
					blockchainId: currentBC.id,
					name,
				},
			});
			if (existingProtocol) throw new Error();

			protocol = await Protocol.create({
				name,
				blockchainId: currentBC.id,
				timestampId: currentTS?.id,
			}).save();
		} catch (err) {
			return {
				errors: [
					{
						field: "",
						message: "Could not save the protocol",
					},
				],
			};
		}
		return { protocol };
	}

	@Mutation(() => Boolean)
	async updateProtocol(
		@Arg("protocolId") protocolId: number,
		@Arg("risk") risk: number,
		@Arg("apr") apr: number
	): Promise<Boolean> {
		try {
			console.log(protocolId);
			console.log(risk);
			console.log(apr);
			const riskParsed = Math.floor(risk);
			const aprParsed = Math.floor(apr);
			await Protocol.update(protocolId, {
				risk: riskParsed,
				apr: aprParsed,
			});
		} catch (err) {
			return false;
		}
		return true;
	}
}
