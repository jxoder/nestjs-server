import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migration1743424680577 implements MigrationInterface {
  name = 'Migration1743424680577'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."user_role_enum" AS ENUM('ANONYMOUS', 'USER', 'ADMIN', 'MASTER')
        `)
    await queryRunner.query(`
            CREATE TABLE "user" (
                "created_at" TIMESTAMP NOT NULL,
                "updated_at" TIMESTAMP NOT NULL,
                "id" SERIAL NOT NULL,
                "name" character varying(20),
                "role" "public"."user_role_enum" NOT NULL,
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            );
            COMMENT ON COLUMN "user"."created_at" IS 'created at';
            COMMENT ON COLUMN "user"."updated_at" IS 'updated at';
            COMMENT ON COLUMN "user"."id" IS 'ID';
            COMMENT ON COLUMN "user"."name" IS 'nickname';
            COMMENT ON COLUMN "user"."role" IS 'user role'
        `)
    await queryRunner.query(`
            CREATE TABLE "email_account" (
                "created_at" TIMESTAMP NOT NULL,
                "updated_at" TIMESTAMP NOT NULL,
                "id" SERIAL NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "logged_at" TIMESTAMP,
                "user_id" integer NOT NULL,
                CONSTRAINT "REL_7a868948b6ac436d404eacf8ce" UNIQUE ("user_id"),
                CONSTRAINT "PK_21a4813c9e9dd0de067dc542c57" PRIMARY KEY ("id")
            );
            COMMENT ON COLUMN "email_account"."created_at" IS 'created at';
            COMMENT ON COLUMN "email_account"."updated_at" IS 'updated at';
            COMMENT ON COLUMN "email_account"."id" IS 'ID';
            COMMENT ON COLUMN "email_account"."email" IS 'login email';
            COMMENT ON COLUMN "email_account"."password" IS 'hashed password';
            COMMENT ON COLUMN "email_account"."logged_at" IS 'last logged at';
            COMMENT ON COLUMN "email_account"."user_id" IS 'user id'
        `)
    await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_a7a173fb9d13834d84fcdd7849" ON "email_account" ("email")
        `)
    await queryRunner.query(`
            CREATE TABLE "bearer_refresh_token" (
                "created_at" TIMESTAMP NOT NULL,
                "updated_at" TIMESTAMP NOT NULL,
                "token" character varying(36) NOT NULL,
                "user_id" integer NOT NULL,
                "expired_at" TIMESTAMP NOT NULL,
                "accessed_at" TIMESTAMP,
                CONSTRAINT "PK_23be54cd4d2970c1658b06f91fd" PRIMARY KEY ("token")
            );
            COMMENT ON COLUMN "bearer_refresh_token"."created_at" IS 'created at';
            COMMENT ON COLUMN "bearer_refresh_token"."updated_at" IS 'updated at';
            COMMENT ON COLUMN "bearer_refresh_token"."token" IS 'token (uuid)';
            COMMENT ON COLUMN "bearer_refresh_token"."user_id" IS 'user id';
            COMMENT ON COLUMN "bearer_refresh_token"."expired_at" IS 'expired at';
            COMMENT ON COLUMN "bearer_refresh_token"."accessed_at" IS 'last used at'
        `)
    await queryRunner.query(`
            CREATE INDEX "IDX_63fe1045cb19d62a634abbd3fb" ON "bearer_refresh_token" ("expired_at")
        `)
    await queryRunner.query(`
            ALTER TABLE "email_account"
            ADD CONSTRAINT "FK_7a868948b6ac436d404eacf8ce6" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    await queryRunner.query(`
            ALTER TABLE "bearer_refresh_token"
            ADD CONSTRAINT "FK_63914d2b2804ca867b56d5ff00b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "bearer_refresh_token" DROP CONSTRAINT "FK_63914d2b2804ca867b56d5ff00b"
        `)
    await queryRunner.query(`
            ALTER TABLE "email_account" DROP CONSTRAINT "FK_7a868948b6ac436d404eacf8ce6"
        `)
    await queryRunner.query(`
            DROP INDEX "public"."IDX_63fe1045cb19d62a634abbd3fb"
        `)
    await queryRunner.query(`
            DROP TABLE "bearer_refresh_token"
        `)
    await queryRunner.query(`
            DROP INDEX "public"."IDX_a7a173fb9d13834d84fcdd7849"
        `)
    await queryRunner.query(`
            DROP TABLE "email_account"
        `)
    await queryRunner.query(`
            DROP TABLE "user"
        `)
    await queryRunner.query(`
            DROP TYPE "public"."user_role_enum"
        `)
  }
}
