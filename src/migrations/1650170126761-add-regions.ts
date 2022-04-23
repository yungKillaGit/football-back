import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { SIMPLE_MODEL_COLUMNS } from 'common/constants/migrations-common-columns';

export class addRegions1650170126761 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'regions',
        columns: [
          ...SIMPLE_MODEL_COLUMNS,
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
