import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

const TABLE_NAME = 'lists';

export class CreateLists1673316386540 implements MigrationInterface {
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
          },
          {
            name: 'post_id',
            type: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'background_image_url',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'is_private',
            type: 'boolean',
            default: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      TABLE_NAME,
      new TableForeignKey({
        name: 'PostId',
        columnNames: ['post_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'posts',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(TABLE_NAME, 'PostId');

    await queryRunner.dropTable(TABLE_NAME);
  }
}
