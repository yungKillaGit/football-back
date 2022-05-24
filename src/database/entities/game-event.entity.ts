import { Column, Entity } from 'typeorm';
import { SimpleBaseModel } from './base-model.entity';

@Entity('game-events', { schema: 'public' })
export class GameEvent extends SimpleBaseModel {
  @Column('character varying', { name: 'name' })
  name: string;
}
