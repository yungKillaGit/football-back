import { Column, Entity } from 'typeorm';
import { SimpleBaseModel } from 'core/entities/base-model.entity';

@Entity({ name: 'regions' })
export class Region extends SimpleBaseModel {
  @Column()
  name: string;
}
