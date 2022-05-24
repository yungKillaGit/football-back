import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';
import { SIMPLE_MODEL_COLUMNS } from '../common/constants/migrations-common-columns';

const tableName = 'game-players';
const gamesTableName = 'games';
const playersTableName = 'players';
const positionsTableName = 'player-positions';
const groupTeamsTableName = 'group-teams';

const columns = {
  gameId: {
    name: 'gameId',
    type: 'int',
    refTableName: gamesTableName,
  },
  playerId: {
    name: 'playerId',
    type: 'int',
    refTableName: playersTableName,
  },
  positionId: {
    name: 'positionId',
    type: 'int',
    refTableName: positionsTableName,
  },
  groupTeamId: {
    name: 'groupTeamId',
    type: 'int',
    refTableName: groupTeamsTableName,
  },
};

export class addGamePlayers1652621529591 implements MigrationInterface {
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
        columnNames: [columns.gameId.name],
        referencedColumnNames: ['id'],
        referencedTableName: columns.gameId.refTableName,
        onDelete: 'NO ACTION',
      }),
    );

    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: [columns.playerId.name],
        referencedColumnNames: ['id'],
        referencedTableName: columns.playerId.refTableName,
        onDelete: 'NO ACTION',
      }),
    );

    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: [columns.positionId.name],
        referencedColumnNames: ['id'],
        referencedTableName: columns.positionId.refTableName,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
