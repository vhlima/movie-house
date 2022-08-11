import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { timestamps } from '../fields/timestamps';

const TABLE_NAME = 'users';

export class CreateUsers1660164273196 implements MigrationInterface {
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
            name: 'username',
            type: 'varchar',
          },
          {
            name: 'real_name',
            type: 'varchar',
          },
          {
            name: 'biography',
            type: 'text',
          },
          {
            name: 'profile_picture_url',
            type: 'varchar',
          },
          ...timestamps,
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const a = 1;
  }
}
