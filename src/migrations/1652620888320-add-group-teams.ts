import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';
import { SIMPLE_MODEL_COLUMNS } from '../common/constants/migrations-common-columns';

const tableName = 'group-teams';

export class addGroupTeams1652620888320 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          ...SIMPLE_MODEL_COLUMNS,
          {
            name: 'teamId',
            type: 'int',
          },
          {
            name: 'groupId',
            type: 'int',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: ['teamId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'teams',
        onDelete: 'NO ACTION',
      }),
    );

    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: ['groupId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tournament-groups',
        onDelete: 'NO ACTION',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
