import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

const TABLE_NAME = 'replies';

export class CreateReplies1660358504011 implements MigrationInterface {
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
          {
            name: 'commentary_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(TABLE_NAME, 'UserId');
    await queryRunner.dropForeignKey(TABLE_NAME, 'CommentaryId');

    await queryRunner.dropTable(TABLE_NAME);
  }
}
