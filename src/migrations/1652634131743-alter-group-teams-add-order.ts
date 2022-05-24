import { MigrationInterface, QueryRunner } from 'typeorm';

const tableName = 'group-teams';

export class alterGroupTeamsAddOrder1652634131743 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "${tableName}" ADD COLUMN "order" INT NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
