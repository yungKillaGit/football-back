import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { baseModelColumns } from 'core/constants/migrations-common-columns';

const tableName = 'teams';

export class addTeams1650174571643 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          ...baseModelColumns,
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'countryCode',
            type: 'varchar',
          },
          {
            name: 'flagId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'regionId',
            type: 'int',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: ['flagId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'flags',
        onDelete: 'SET NULL',
      }),
    );
    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: ['regionId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'regions',
        onDelete: 'NO ACTION',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(tableName, 'flagId');
    await queryRunner.dropForeignKey(tableName, 'regionId');
    await queryRunner.dropTable(tableName);
  }
}
