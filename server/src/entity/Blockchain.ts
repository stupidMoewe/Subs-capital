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
import { Protocol } from "./Protocol";
import { Timestamp } from "./Timestamp";
import { Token } from "./Token";

@ObjectType()
@Entity("Blockchain")
export class Blockchain extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	name!: string;

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;

	// 1 BC can have multiple Protocols
	@Field(() => [Protocol], { nullable: true })
	@OneToMany(() => Protocol, (protocol) => protocol.blockchain, {
		cascade: true,
	})
	protocols: Protocol[];

	// 1 BC can have multiple Tokens
	@Field(() => [Token], { nullable: true })
	@OneToMany(() => Token, (token) => token.blockchain, {
		cascade: true,
	})
	tokens: Token[];

	@Field(() => Timestamp)
	@ManyToOne(() => Timestamp, (timestamp) => timestamp.blockchains)
	timestamp!: Timestamp;
}
