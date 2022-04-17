import { Column } from 'typeorm';
import { SimpleBaseModel } from 'core/entities/base-model.entity';

export class Flag extends SimpleBaseModel {
  @Column()
  path: string;
}
