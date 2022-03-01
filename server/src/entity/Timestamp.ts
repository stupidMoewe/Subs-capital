import { Field, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Blockchain } from "./Blockchain";
import { Pool } from "./Pool";
import { Protocol } from "./Protocol";
import { Token } from "./Token";

@ObjectType()
@Entity("Timestamp")
export class Timestamp extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn("increment")
	id!: number;

	@Field(() => String)
	@Column({ type: "timestamptz" })
	beginTime!: Date;

	@Field(() => String, { nullable: true })
	@Column({ type: "timestamptz", nullable: true })
	endTime: Date;

	// @Field()
	// @Column({ default: 0 })
	// globalAPR: number;

	// @Field()
	// @Column({ default: null })
	// globalVolatility: number;

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;

	// 1 TS can have multiple BC
	@Field(() => [Blockchain], { nullable: true })
	@OneToMany(() => Blockchain, (blockchain) => blockchain.timestamp, {
		cascade: true,
	})
	blockchains: Blockchain[];

	@Field(() => [Token], { nullable: true })
	@OneToMany(() => Token, (token) => token.timestamp, {
		cascade: true,
	})
	tokens: Token[];

	@Field(() => [Protocol], { nullable: true })
	@OneToMany(() => Protocol, (protocol) => protocol.timestamp, {
		cascade: true,
	})
	protocols: Protocol[];

	@Field(() => [Pool], { nullable: true })
	@OneToMany(() => Pool, (pool) => pool.timestamp, {
		cascade: true,
	})
	pools: Pool[];
}
