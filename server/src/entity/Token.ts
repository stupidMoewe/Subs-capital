import { Field, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Blockchain } from "./Blockchain";
import { Timestamp } from "./Timestamp";

@ObjectType()
@Entity("Token")
export class Token extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column({ unique: true })
	name!: string;

	@Field()
	@Column()
	valueUSD: number;

	@Field()
	@Column({ default: 0 })
	globalProportion: number;

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;

	@Field(() => Timestamp)
	@ManyToOne(() => Timestamp, (timestamp) => timestamp.tokens)
	timestamp: Timestamp;

	// each Tokens belongs to one BC
	@Field(() => [Blockchain], { nullable: true })
	@ManyToOne(() => Blockchain, (blockchain) => blockchain.tokens)
	blockchain: Blockchain[];
}
