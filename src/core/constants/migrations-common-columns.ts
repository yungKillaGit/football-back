import { TableColumnOptions } from 'typeorm';

export const baseModelColumns: TableColumnOptions[] = [
  {
    name: 'id',
    type: 'int',
    isPrimary: true,
  },
  {
    name: 'created',
    type: 'timestamp',
    default: 'now()',
  },
  {
    name: 'updated',
    type: 'timestamp',
    default: 'now()',
  },
  {
    name: 'deleted',
    type: 'boolean',
    default: false,
  },
];
