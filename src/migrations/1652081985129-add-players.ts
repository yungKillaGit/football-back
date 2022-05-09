import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import { BASE_MODEL_COLUMNS } from '../common/constants/migrations-common-columns';

const tableName = 'players';

export class addPlayers1652081985129 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          ...BASE_MODEL_COLUMNS,
          {
            name: 'firstName',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'lastName',
            type: 'varchar',
          },
          {
            name: 'birthDate',
            type: 'date',
          },
          {
            name: 'shirtNumber',
            type: 'int',
          },
          {
            name: 'positionId',
            type: 'int',
          },
          {
            name: 'teamId',
            type: 'int',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: ['positionId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'player-positions',
        onDelete: 'NO ACTION',
      }),
    );
    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: ['teamId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'teams',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(tableName, 'positionId');
    await queryRunner.dropForeignKey(tableName, 'teamId');
    await queryRunner.dropTable(tableName);
  }
}
