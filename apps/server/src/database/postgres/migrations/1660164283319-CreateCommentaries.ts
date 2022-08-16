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

const TABLE_NAME = 'commentaries';

export class CreateCommentaries1660164283319 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TABLE_NAME,
        columns: [...commentaryBaseFields, ...timestamps],
      }),
    );

    const foreignKeysPromise = commentaryBaseForeingKeys.map(async foreingKey =>
      queryRunner.createForeignKey(TABLE_NAME, foreingKey),
    );

    await Promise.all(foreignKeysPromise);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const foreignKeysPromise = commentaryBaseForeingKeys.map(async foreignKey =>
      queryRunner.dropForeignKey(TABLE_NAME, foreignKey.name || ''),
    );

    await Promise.all(foreignKeysPromise);

    await queryRunner.dropTable(TABLE_NAME);
  }
}
