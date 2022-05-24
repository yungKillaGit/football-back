import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { SimpleBaseModel } from './base-model.entity';
import { Game } from './game.entity';
import { GroupTeam } from './group-team.entity';
import { Tournament } from './tournament.entity';

@Entity('tournament-stages', { schema: 'public' })
export class TournamentStage extends SimpleBaseModel {
  @Column('character varying', { name: 'name' })
  name: string;

  @OneToMany(() => Game, (game) => game.stage)
  games: Game[];

  @OneToMany(() => GroupTeam, (groupTeam) => groupTeam.stage)
  teams: GroupTeam[];

  @ManyToOne(() => Tournament, (tournaments) => tournaments.tournamentStages)
  @JoinColumn([{ name: 'tournamentId', referencedColumnName: 'id' }])
  tournament: Tournament;

  @Column()
  tournamentId: number;
}
