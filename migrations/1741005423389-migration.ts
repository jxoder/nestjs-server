import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migration1741005423389 implements MigrationInterface {
  name = 'Migration1741005423389'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "setting" (
                "created_at" TIMESTAMP NOT NULL,
                "updated_at" TIMESTAMP NOT NULL,
                "id" SERIAL NOT NULL,
                "key" character varying(40) NOT NULL,
                "value" jsonb NOT NULL DEFAULT '{}',
                CONSTRAINT "PK_9ed6d7ffeaa0696a79a0e4a977b" PRIMARY KEY ("id", "key")
            );
            COMMENT ON COLUMN "setting"."created_at" IS 'created at';
            COMMENT ON COLUMN "setting"."updated_at" IS 'updated at';
            COMMENT ON COLUMN "setting"."id" IS 'ID';
            COMMENT ON COLUMN "setting"."key" IS 'setting key';
            COMMENT ON COLUMN "setting"."value" IS 'setting value'
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "setting"
        `)
  }
}
