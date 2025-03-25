import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1742914040967 implements MigrationInterface {
    name = 'Migration1742914040967'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."user_role_enum" AS ENUM('ANONYMOUS', 'USER', 'ADMIN', 'MASTER')
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "created_at" TIMESTAMP NOT NULL,
                "updated_at" TIMESTAMP NOT NULL,
                "id" SERIAL NOT NULL,
                "name" character varying(40),
                "role" "public"."user_role_enum" NOT NULL,
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            );
            COMMENT ON COLUMN "user"."created_at" IS 'created at';
            COMMENT ON COLUMN "user"."updated_at" IS 'updated at';
            COMMENT ON COLUMN "user"."id" IS 'ID';
            COMMENT ON COLUMN "user"."name" IS 'nickname';
            COMMENT ON COLUMN "user"."role" IS 'user role'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."user_role_enum"
        `);
    }

}
