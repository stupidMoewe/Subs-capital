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
import { Protocol } from "./Protocol";
import { Timestamp } from "./Timestamp";

@ObjectType()
@Entity("Pool")
export class Pool extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	poolName!: string;

	// @Field()
	// @Column()
	// protocolId!: number;

	@Field()
	@Column()
	timestampId!: number;

	@Field()
	@Column()
	token0!: string;

	@Field()
	@Column()
	token1!: string;

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

	// Multiple Pool can have 1 protocol
	@Field(() => Protocol)
	@ManyToOne(() => Protocol, (protocol) => protocol.pools)
	protocol!: Protocol;

	@Field(() => Timestamp)
	@ManyToOne(() => Timestamp, (timestamp) => timestamp.pools)
	timestamp!: Timestamp;
}
