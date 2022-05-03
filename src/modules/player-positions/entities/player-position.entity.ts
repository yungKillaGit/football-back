import { Column, Entity } from 'typeorm';
import { SimpleBaseModel } from 'database/entities/base-model.entity';

@Entity({ name: 'player-positions' })
export class PlayerPosition extends SimpleBaseModel {
  @Column()
  name: string;
}
