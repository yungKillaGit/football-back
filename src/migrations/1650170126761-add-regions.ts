import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { simpleModelColumns } from 'core/constants/migrations-common-columns';

export class addRegions1650170126761 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'regions',
        columns: [
          ...simpleModelColumns,
          {
            name: 'name',
            type: 'varchar',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('regions');
  }
}
