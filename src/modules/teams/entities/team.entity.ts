import {
  Column, Entity, JoinColumn, OneToMany, OneToOne,
} from 'typeorm';
import { BaseModel } from 'database/entities/base-model.entity';
import { Flag } from 'modules/flags/entities/flag.entity';
import { Region } from 'modules/regions/entities/region.entity';
import { Player } from './player.entity';

@Entity({ name: 'teams' })
export class Team extends BaseModel {
  @Column()
  name: string;

  @Column()
  countryCode: string;

  @OneToOne(() => Flag)
  @JoinColumn()
  flag?: Flag;

  @Column()
  flagId?: number;

  @OneToOne(() => Region)
  @JoinColumn()
  region: Region;

  @Column()
  regionId: number;

  @OneToMany(() => Player, (player) => player.team)
  players: Player[];
}
