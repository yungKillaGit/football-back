import { Column } from 'typeorm';
import { SimpleBaseModel } from 'core/entities/base-model.entity';

export class Region extends SimpleBaseModel {
  @Column()
  name: string;
}
