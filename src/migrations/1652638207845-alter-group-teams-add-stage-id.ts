import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

const tableName = 'group-teams';

export class alterGroupTeamsAddStageId1652638207845 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "${tableName}" ADD COLUMN "stageId" INT NOT NULL`);

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
