import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { SimpleBaseModel } from './base-model.entity';
import { GroupTeam } from './group-team.entity';
import { TournamentGameEvent } from './tournament-game-event.entity';
import { TournamentStage } from './tournament-stage.entity';

@Entity('games', {
  schema: 'public',
  orderBy: {
    order: 'ASC',
  },
})
export class Game extends SimpleBaseModel {
  @Column('integer', { name: 'homeTeamPoints' })
  homeTeamPoints: number;

  @Column('integer', { name: 'awayTeamPoints' })
  awayTeamPoints: number;

  @ManyToOne(() => GroupTeam, (groupTeam) => groupTeam.gamesAsAwayTeam)
  @JoinColumn([{ name: 'awayTeamId', referencedColumnName: 'id' }])
  awayTeam: GroupTeam;

  @Column()
  awayTeamId: number;

  @ManyToOne(() => GroupTeam, (groupTeam) => groupTeam.gamesAsAwayTeam)
  @JoinColumn([{ name: 'homeTeamId', referencedColumnName: 'id' }])
  homeTeam: GroupTeam;

  @Column()
  homeTeamId: number;

  @ManyToOne(
    () => TournamentStage,
    (tournamentStage) => tournamentStage.games,
  )
  @JoinColumn([{ name: 'stageId', referencedColumnName: 'id' }])
  stage: TournamentStage;

  @Column()
  stageId: number;

  @OneToMany(
    () => TournamentGameEvent,
    (tournamentGameEvents) => tournamentGameEvents.game,
  )
  tournamentGameEvents: TournamentGameEvent[];

  @Column({ nullable: true })
  order: number;
}
