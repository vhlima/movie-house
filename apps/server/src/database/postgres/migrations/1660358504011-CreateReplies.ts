import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

import {
  commentaryBaseFields,
  commentaryBaseForeingKeys,
} from '../fields/commentaryBase';

import { timestamps } from '../fields/timestamps';

const TABLE_NAME = 'replies';

export class CreateReplies1660358504011 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TABLE_NAME,
        columns: [
          ...commentaryBaseFields,
          {
            name: 'commentary_id',
            type: 'uuid',
          },
          ...timestamps,
        ],
      }),
    );

    await queryRunner.createForeignKey(
      TABLE_NAME,
      new TableForeignKey({
        name: 'CommentaryId',
        columnNames: ['commentary_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'commentaries',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    const foreignKeysPromise = commentaryBaseForeingKeys.map(async foreingKey =>
      queryRunner.createForeignKey(TABLE_NAME, foreingKey),
    );

    await Promise.all(foreignKeysPromise);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(TABLE_NAME, 'CommentaryId');

    const foreignKeysPromise = commentaryBaseForeingKeys.map(async foreignKey =>
      queryRunner.dropForeignKey(TABLE_NAME, foreignKey.name || ''),
    );

    await Promise.all(foreignKeysPromise);

    await queryRunner.dropTable(TABLE_NAME);
  }
}
