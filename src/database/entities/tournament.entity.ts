import {
  Column, Entity, ManyToMany, JoinTable, OneToMany,
} from 'typeorm';
import { BaseModel } from './base-model.entity';
import { Team } from './team.entity';
import { TournamentGroup } from './tournament-group.entity';
import { TournamentStage } from './tournament-stage.entity';

@Entity({ name: 'tournaments', orderBy: { startDate: 'DESC' } })
export class Tournament extends BaseModel {
  @Column('character varying', { name: 'name' })
  name: string;

  @Column('date', { name: 'startDate' })
  startDate: Date;

  @Column('date', { name: 'endDate' })
  endDate: Date;

  @Column('boolean', { name: 'ready' })
  ready: Boolean;

  @ManyToMany(() => Team)
  @JoinTable({
    name: 'tournament-teams',
    inverseJoinColumn: { name: 'teamId' },
    joinColumn: { name: 'tournamentId' },
  })
  teams: Team[];

  @OneToMany(
    () => TournamentGroup,
    (tournamentGroup) => tournamentGroup.tournament,
  )
  tournamentGroups: TournamentGroup[];

  @OneToMany(
    () => TournamentStage,
    (tournamentStage) => tournamentStage.tournament,
  )
  tournamentStages: TournamentStage[];
}
