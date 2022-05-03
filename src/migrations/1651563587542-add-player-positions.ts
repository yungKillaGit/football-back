import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { SIMPLE_MODEL_COLUMNS } from 'common/constants/migrations-common-columns';

const tableName = 'player-positions';

export class addPlayerPositions1651563587542 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
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
    await queryRunner.dropTable(tableName);
  }
}
