import { Column, Entity } from 'typeorm';
import { SimpleBaseModel } from 'core/entities/base-model.entity';

@Entity({ name: 'flags' })
export class Flag extends SimpleBaseModel {
  @Column()
  path: string;
}
