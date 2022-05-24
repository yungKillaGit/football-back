import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';
import { SIMPLE_MODEL_COLUMNS } from '../common/constants/migrations-common-columns';

const tableName = 'tournament-stages';

export class addTournamentStages1652621035605 implements MigrationInterface {
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
          {
            name: 'tournamentId',
            type: 'int',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: ['tournamentId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tournaments',
        onDelete: 'NO ACTION',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
