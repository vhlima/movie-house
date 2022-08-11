import { TableColumnOptions } from 'typeorm';

export const timestamps: TableColumnOptions[] = [
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
];
