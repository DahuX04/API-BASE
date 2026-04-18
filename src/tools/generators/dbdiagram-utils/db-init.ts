import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1775069539843 implements MigrationInterface {
	name = 'Init1775069539843';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "upc"."type_groups" ("id" SERIAL NOT NULL, "extra" jsonb NOT NULL DEFAULT '{}'::jsonb, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE, "code" character varying(50) NOT NULL, "name" character varying(1000) NOT NULL, "is_editable" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_2e70b216ddac5c1ce8eb9410122" UNIQUE ("code"), CONSTRAINT "PK_73650a04200c679d5b25227ea5f" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "upc"."types" ("id" SERIAL NOT NULL, "extra" jsonb NOT NULL DEFAULT '{}'::jsonb, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE, "type_group_id" integer NOT NULL, "code" character varying(50) NOT NULL, "name" character varying(1000) NOT NULL, "is_editable" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_0888743b52d75e0435c1da667d0" UNIQUE ("code"), CONSTRAINT "PK_33b81de5358589c738907c3559b" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "upc"."ubications" ("id" SERIAL NOT NULL, "extra" jsonb NOT NULL DEFAULT '{}'::jsonb, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE, "root_ubication_id" integer, "code" character varying(50) NOT NULL, "name" character varying(1000) NOT NULL, CONSTRAINT "UQ_462b6e8c652bbc47d9f73f1abb6" UNIQUE ("code"), CONSTRAINT "PK_3b6ed098d183c507c5f429006bf" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "upc"."verification_notes" ("id" SERIAL NOT NULL, "extra" jsonb NOT NULL DEFAULT '{}'::jsonb, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE, "code" character varying(50) NOT NULL, "name" character varying(1000) NOT NULL, "description" character varying(1000) NOT NULL, "grade" numeric(12,6), "grade_type_id" integer NOT NULL, "ubication_id" integer NOT NULL, CONSTRAINT "UQ_a89beaa792e33bccb2c37ce7d6f" UNIQUE ("code"), CONSTRAINT "REL_6642dfdfc649aeedfc1ee5335a" UNIQUE ("grade_type_id"), CONSTRAINT "PK_6046409505b0f41d5019b994ec7" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "upc"."parameters" ("id" SERIAL NOT NULL, "extra" jsonb NOT NULL DEFAULT '{}'::jsonb, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE, "code" character varying(50) NOT NULL, "value" text NOT NULL, "description" character varying(5000), "is_json" boolean DEFAULT false, "is_encrypted" boolean DEFAULT false, CONSTRAINT "UQ_f9bdd410abefd57f573ec1bf9ec" UNIQUE ("code"), CONSTRAINT "PK_6b03a26baa3161f87fa87588859" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "upc"."currencies" ("id" SERIAL NOT NULL, "extra" jsonb NOT NULL DEFAULT '{}'::jsonb, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE, "code" character varying(50) NOT NULL, "name" character varying(1000) NOT NULL, "symbol" character varying(100) NOT NULL, CONSTRAINT "UQ_9f8d0972aeeb5a2277e40332d29" UNIQUE ("code"), CONSTRAINT "PK_d528c54860c4182db13548e08c4" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "upc"."users" ("id" SERIAL NOT NULL, "extra" jsonb NOT NULL DEFAULT '{}'::jsonb, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE, "email" character varying(500) NOT NULL, "password" character varying(1000), "is_admin" boolean DEFAULT false, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`ALTER TABLE "upc"."types" ADD CONSTRAINT "FK_d1bfd236db1805a762aa30de369" FOREIGN KEY ("type_group_id") REFERENCES "upc"."type_groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "upc"."ubications" ADD CONSTRAINT "FK_5491a6285f63eca7780b36ed43a" FOREIGN KEY ("root_ubication_id") REFERENCES "upc"."ubications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "upc"."verification_notes" ADD CONSTRAINT "FK_6642dfdfc649aeedfc1ee5335a6" FOREIGN KEY ("grade_type_id") REFERENCES "upc"."types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "upc"."verification_notes" ADD CONSTRAINT "FK_4cd5c4a681235ff4a168b286b8f" FOREIGN KEY ("ubication_id") REFERENCES "upc"."ubications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "upc"."verification_notes" DROP CONSTRAINT "FK_4cd5c4a681235ff4a168b286b8f"`);
		await queryRunner.query(`ALTER TABLE "upc"."verification_notes" DROP CONSTRAINT "FK_6642dfdfc649aeedfc1ee5335a6"`);
		await queryRunner.query(`ALTER TABLE "upc"."ubications" DROP CONSTRAINT "FK_5491a6285f63eca7780b36ed43a"`);
		await queryRunner.query(`ALTER TABLE "upc"."types" DROP CONSTRAINT "FK_d1bfd236db1805a762aa30de369"`);
		await queryRunner.query(`DROP TABLE "upc"."users"`);
		await queryRunner.query(`DROP TABLE "upc"."currencies"`);
		await queryRunner.query(`DROP TABLE "upc"."parameters"`);
		await queryRunner.query(`DROP TABLE "upc"."verification_notes"`);
		await queryRunner.query(`DROP TABLE "upc"."ubications"`);
		await queryRunner.query(`DROP TABLE "upc"."types"`);
		await queryRunner.query(`DROP TABLE "upc"."type_groups"`);
	}
}
