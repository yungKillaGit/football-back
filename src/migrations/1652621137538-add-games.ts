import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';
import { SIMPLE_MODEL_COLUMNS } from '../common/constants/migrations-common-columns';

const tableName = 'games';

export class addGames1652621137538 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const columns = {
      homeTeamId: {
        name: 'homeTeamId',
        type: 'int',
      },
      awayTeamId: {
        name: 'awayTeamId',
        type: 'int',
      },
      stageId: {
        name: 'stageId',
        type: 'int',
      },
      homeTeamPoints: {
        name: 'homeTeamPoints',
        type: 'int',
      },
      awayTeamPoints: {
        name: 'awayTeamPoints',
        type: 'int',
      },
    };
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          ...SIMPLE_MODEL_COLUMNS,
          ...Object.values(columns),
        ],
      }),
    );

    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: [columns.homeTeamId.name],
        referencedColumnNames: ['id'],
        referencedTableName: 'group-teams',
        onDelete: 'NO ACTION',
      }),
    );

    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: [columns.awayTeamId.name],
        referencedColumnNames: ['id'],
        referencedTableName: 'group-teams',
        onDelete: 'NO ACTION',
      }),
    );

    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: [columns.stageId.name],
        referencedColumnNames: ['id'],
        referencedTableName: 'tournament-stages',
        onDelete: 'NO ACTION',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
