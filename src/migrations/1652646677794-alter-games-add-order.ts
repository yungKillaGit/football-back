import { MigrationInterface, QueryRunner } from 'typeorm';

const tableName = 'games';

export class alterGamesAddOrder1652646677794 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "${tableName}" ADD COLUMN "order" INT NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
