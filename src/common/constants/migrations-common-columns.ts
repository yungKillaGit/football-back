import { TableColumnOptions } from 'typeorm';

export const SIMPLE_MODEL_COLUMNS: TableColumnOptions[] = [
  {
    name: 'id',
    type: 'int',
    isGenerated: true,
    isPrimary: true,
    generationStrategy: 'increment',
  },
];

export const BASE_MODEL_COLUMNS: TableColumnOptions[] = [
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
];
