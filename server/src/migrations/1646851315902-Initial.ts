import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1646851315902 implements MigrationInterface {
    name = 'Initial1646851315902'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Token" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "valueUSD" integer NOT NULL, "globalProportion" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "timestampId" integer, "blockchainId" integer, CONSTRAINT "UQ_1e764a4f3eaee9050cce8da5be7" UNIQUE ("name"), CONSTRAINT "PK_206d2a22c0a6839d849fb7016b5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Timestamp" ("id" SERIAL NOT NULL, "beginTime" TIMESTAMP WITH TIME ZONE NOT NULL, "endTime" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b91f14b72787d5ebb29351139fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Pool" ("id" SERIAL NOT NULL, "poolAddress" character varying NOT NULL, "poolName" character varying NOT NULL, "timestampId" integer NOT NULL, "token0" character varying NOT NULL, "token1" character varying NOT NULL, "apr" integer NOT NULL DEFAULT '0', "tvl" integer NOT NULL DEFAULT '0', "weight" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "protocolId" integer, CONSTRAINT "PK_3b478fad2741be298b934226d12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Protocol" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "blockchainId" integer NOT NULL, "timestampId" integer NOT NULL, "risk" integer, "apr" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ef4cec49a6eac93b0b564d4558c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Blockchain" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "timestampId" integer, CONSTRAINT "PK_ca610855133df6794b8fd1ea177" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Token" ADD CONSTRAINT "FK_bb15bf248b0f644662bf8c2e100" FOREIGN KEY ("timestampId") REFERENCES "Timestamp"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Token" ADD CONSTRAINT "FK_e19dba5f3c573bd4e6ebe5182b6" FOREIGN KEY ("blockchainId") REFERENCES "Blockchain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Pool" ADD CONSTRAINT "FK_c5955cee14ca8a74e4955ca3661" FOREIGN KEY ("protocolId") REFERENCES "Protocol"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Pool" ADD CONSTRAINT "FK_b1f086ff93b95dc2e845b348fee" FOREIGN KEY ("timestampId") REFERENCES "Timestamp"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Protocol" ADD CONSTRAINT "FK_ba9fa3def453b16e7dd178deefb" FOREIGN KEY ("blockchainId") REFERENCES "Blockchain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Protocol" ADD CONSTRAINT "FK_088a07cce90b80bbd6b40f1cfe7" FOREIGN KEY ("timestampId") REFERENCES "Timestamp"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Blockchain" ADD CONSTRAINT "FK_104ed942c050cc8c1842e195ef4" FOREIGN KEY ("timestampId") REFERENCES "Timestamp"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Blockchain" DROP CONSTRAINT "FK_104ed942c050cc8c1842e195ef4"`);
        await queryRunner.query(`ALTER TABLE "Protocol" DROP CONSTRAINT "FK_088a07cce90b80bbd6b40f1cfe7"`);
        await queryRunner.query(`ALTER TABLE "Protocol" DROP CONSTRAINT "FK_ba9fa3def453b16e7dd178deefb"`);
        await queryRunner.query(`ALTER TABLE "Pool" DROP CONSTRAINT "FK_b1f086ff93b95dc2e845b348fee"`);
        await queryRunner.query(`ALTER TABLE "Pool" DROP CONSTRAINT "FK_c5955cee14ca8a74e4955ca3661"`);
        await queryRunner.query(`ALTER TABLE "Token" DROP CONSTRAINT "FK_e19dba5f3c573bd4e6ebe5182b6"`);
        await queryRunner.query(`ALTER TABLE "Token" DROP CONSTRAINT "FK_bb15bf248b0f644662bf8c2e100"`);
        await queryRunner.query(`DROP TABLE "Blockchain"`);
        await queryRunner.query(`DROP TABLE "Protocol"`);
        await queryRunner.query(`DROP TABLE "Pool"`);
        await queryRunner.query(`DROP TABLE "Timestamp"`);
        await queryRunner.query(`DROP TABLE "Token"`);
    }

}
