import {
  Column, Entity, JoinColumn, OneToMany, OneToOne,
} from 'typeorm';
import { BaseModel } from 'database/entities/base-model.entity';
import { Flag } from './flag.entity';
import { Region } from './region.entity';
import { Player } from './player.entity';

@Entity({ name: 'teams' })
export class Team extends BaseModel {
  @Column()
  name: string;

  @Column()
  countryCode: string;

  @OneToOne(() => Flag)
  @JoinColumn({ name: 'flagId' })
  flag?: Flag;

  @Column()
  flagId?: number;

  @OneToOne(() => Region)
  @JoinColumn({ name: 'regionId' })
  region: Region;

  @Column()
  regionId: number;

  @OneToMany(() => Player, (player) => player.team)
  players: Player[];
}
