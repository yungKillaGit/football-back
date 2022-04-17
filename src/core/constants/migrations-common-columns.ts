import { TableColumnOptions } from 'typeorm';

export const simpleModelColumns: TableColumnOptions[] = [
  {
    name: 'id',
    type: 'int',
    isGenerated: true,
    isPrimary: true,
    generationStrategy: 'increment',
  },
];

export const baseModelColumns: TableColumnOptions[] = [
  {
    name: 'id',
    type: 'int',
    isGenerated: true,
    isPrimary: true,
    generationStrategy: 'increment',
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
