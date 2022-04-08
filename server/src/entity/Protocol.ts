import { Field, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Blockchain } from "./Blockchain";
import { Pool } from "./Pool";
import { Timestamp } from "./Timestamp";

@ObjectType()
@Entity("Protocol")
export class Protocol extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	name!: string;

	@Field()
	@Column()
	blockchainId!: number;

	@Field()
	@Column()
	timestampId!: number;

	@Field({ nullable: true })
	@Column({ nullable: true })
	risk: number;

	@Field()
	@Column({ default: 0 })
	apr: number;

	@Field()
	@Column({ default: 0 })
	weight: number;

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;

	// 1 Protocol can have multiple Pools
	@Field(() => [Pool], { nullable: true })
	@OneToMany(() => Pool, (pool) => pool.protocol, {
		cascade: true,
	})
	pools: Pool[];

	@Field(() => Blockchain)
	@ManyToOne(() => Blockchain, (blockchain) => blockchain.protocols)
	blockchain: Blockchain;

	@Field(() => Timestamp)
	@ManyToOne(() => Timestamp, (protocol) => protocol.pools)
	timestamp: Timestamp;
}
