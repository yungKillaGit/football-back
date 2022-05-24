import { MigrationInterface, QueryRunner } from 'typeorm';

const tableName = 'tournaments';

export class alterTournamentAddReady1653335057901 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "${tableName}" ADD COLUMN "ready" BOOLEAN NOT NULL DEFAULT(FALSE)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
