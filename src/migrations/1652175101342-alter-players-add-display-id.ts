import { MigrationInterface, QueryRunner } from 'typeorm';

const tableName = 'players';

export class alterPlayersAddDisplayId1652175101342 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE ${tableName} ADD COLUMN "displayId" INT NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(tableName, 'displayId');
  }
}
