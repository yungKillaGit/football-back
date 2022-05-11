import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { BASE_MODEL_COLUMNS } from '../common/constants/migrations-common-columns';

const tableName = 'tournaments';

export class addTournaments1652262128673 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          ...BASE_MODEL_COLUMNS,
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'startDate',
            type: 'date',
          },
          {
            name: 'endDate',
            type: 'date',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName);
  }
}
