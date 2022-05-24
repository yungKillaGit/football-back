import {
  Column, Entity, JoinColumn, ManyToOne, OneToMany,
} from 'typeorm';
import { SimpleBaseModel } from './base-model.entity';
import { GroupTeam } from './group-team.entity';
import { Tournament } from './tournament.entity';

@Entity('tournament-groups', { schema: 'public' })
export class TournamentGroup extends SimpleBaseModel {
  @Column('character varying', { name: 'name' })
  name: string;

  @OneToMany(() => GroupTeam, (groupTeam) => groupTeam.group)
  groupTeams: GroupTeam[];

  @ManyToOne(() => Tournament, (tournaments) => tournaments.tournamentGroups)
  @JoinColumn([{ name: 'tournamentId', referencedColumnName: 'id' }])
  tournament: Tournament;
}
