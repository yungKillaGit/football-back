import {
  Column, Entity, ManyToMany, JoinTable,
} from 'typeorm';
import { BaseModel } from '../../../database/entities/base-model.entity';
import { Team } from '../../teams/entities/team.entity';

@Entity({ name: 'tournaments' })
export class Tournament extends BaseModel {
  @Column('character varying', { name: 'name' })
  name: string;

  @Column('date', { name: 'startDate' })
  startDate: Date;

  @Column('date', { name: 'endDate' })
  endDate: Date;

  @ManyToMany(() => Team)
  @JoinTable({
    name: 'tournament-teams',
    inverseJoinColumn: { name: 'teamId' },
    joinColumn: { name: 'tournamentId' },
  })
  teams: Team[];
}
