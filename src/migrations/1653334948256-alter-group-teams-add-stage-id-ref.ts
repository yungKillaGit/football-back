import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

const tableName = 'group-teams';

export class alterGroupTeamsAddStageIdRef1653334948256 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: ['stageId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tournament-stages',
        onDelete: 'NO ACTION',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
