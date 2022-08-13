import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

import { timestamps } from '../fields/timestamps';

const TABLE_NAME = 'commentaries';

export class CreateCommentaries1660164283319 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TABLE_NAME,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'post_id',
            type: 'varchar',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'body',
            type: 'text',
          },
          ...timestamps,
        ],
      }),
    );

    await queryRunner.createForeignKey(
      TABLE_NAME,
      new TableForeignKey({
        name: 'UserId',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(TABLE_NAME, 'UserId');

    await queryRunner.dropTable(TABLE_NAME);
  }
}
