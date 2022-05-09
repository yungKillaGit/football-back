import { Column, Entity, OneToMany } from 'typeorm';
import { SimpleBaseModel } from 'database/entities/base-model.entity';
import { Player } from 'modules/teams/entities/player.entity';

@Entity({ name: 'player-positions' })
export class PlayerPosition extends SimpleBaseModel {
  @Column()
  name: string;

  @OneToMany(() => Player, (players) => players.position)
  players: Player[];
}
