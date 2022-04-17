import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { simpleModelColumns } from 'core/constants/migrations-common-columns';

export class addFlags1650172012230 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'flags',
        columns: [
          ...simpleModelColumns,
          {
            name: 'path',
            type: 'varchar',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('flags');
  }
}
