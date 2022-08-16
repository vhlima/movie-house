import { TableColumnOptions, TableForeignKey } from 'typeorm';

export const commentaryBaseFields: TableColumnOptions[] = [
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
];

export const commentaryBaseForeingKeys: TableForeignKey[] = [
  new TableForeignKey({
    name: 'UserId',
    columnNames: ['user_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'users',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  }),
];
