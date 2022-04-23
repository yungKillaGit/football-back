import { Column, Entity } from 'typeorm';
import { SimpleBaseModel } from 'database/entities/base-model.entity';

@Entity({ name: 'flags' })
export class Flag extends SimpleBaseModel {
  @Column()
  path: string;
}
