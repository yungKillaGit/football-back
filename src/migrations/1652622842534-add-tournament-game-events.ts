import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';
import { SIMPLE_MODEL_COLUMNS } from '../common/constants/migrations-common-columns';

const tableName = 'tournament-game-events';

const columns = {
  gameMinute: {
    name: 'gameMinute',
    type: 'int',
  },
  extraInfo: {
    name: 'extraInfo',
    type: 'varchar',
  },
  eventId: {
    name: 'eventId',
    type: 'int',
    refTableName: 'game-events',
  },
  groupTeamId: {
    name: 'groupTeamId',
    type: 'int',
    refTableName: 'group-teams',
  },
  gameId: {
    name: 'gameId',
    type: 'int',
    refTableName: 'games',
  },
};

export class addTournamentGameEvents1652622842534 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
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
        columnNames: [columns.eventId.name],
        referencedColumnNames: ['id'],
        referencedTableName: columns.eventId.refTableName,
        onDelete: 'NO ACTION',
      }),
    );

    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: [columns.groupTeamId.name],
        referencedColumnNames: ['id'],
        referencedTableName: columns.groupTeamId.refTableName,
        onDelete: 'NO ACTION',
      }),
    );

    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: [columns.gameId.name],
        referencedColumnNames: ['id'],
        referencedTableName: columns.gameId.refTableName,
        onDelete: 'NO ACTION',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
