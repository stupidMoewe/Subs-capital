import { Field, ObjectType } from "type-graphql";
import { Blockchain } from "../entity/Blockchain";
import { Pool } from "../entity/Pool";
import { Protocol } from "../entity/Protocol";
import { Timestamp } from "../entity/Timestamp";

@ObjectType()
class FieldError {
	@Field()
	field: string;
	@Field()
	message: string;
}

@ObjectType()
export class BlockchainResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];

	@Field(() => Blockchain, { nullable: true })
	blockchain?: Blockchain;
}

@ObjectType()
export class ProtocolResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];

	@Field(() => Protocol, { nullable: true })
	protocol?: Protocol;
}

@ObjectType()
export class PoolResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];

	@Field(() => Pool, { nullable: true })
	pool?: Pool;
}

@ObjectType()
export class TimestampResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];

	@Field(() => Timestamp, { nullable: true })
	timestamp?: Timestamp;
}
