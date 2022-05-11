import { MigrationInterface, QueryRunner } from 'typeorm';

export class dropDeletedFromTables1652261935821 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('teams', 'deleted');
    await queryRunner.dropColumn('players', 'deleted');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
