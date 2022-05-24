import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
} from 'typeorm';
import { SimpleBaseModel } from './base-model.entity';
import { Game } from './game.entity';
import { Team } from './team.entity';
import { TournamentGroup } from './tournament-group.entity';
import { TournamentStage } from './tournament-stage.entity';

@Entity('group-teams', {
  schema: 'public',
  orderBy: {
    order: 'ASC',
  },
})
export class GroupTeam extends SimpleBaseModel {
  @ManyToOne(
    () => TournamentGroup,
    (tournamentGroup) => tournamentGroup.groupTeams,
  )
  @JoinColumn([{ name: 'groupId', referencedColumnName: 'id' }])
  group: TournamentGroup;

  @ManyToOne(
    () => TournamentStage,
    (tournamentStage) => tournamentStage.teams,
  )
  @JoinColumn([{ name: 'stageId', referencedColumnName: 'id' }])
  stage: TournamentStage;

  @Column()
  groupId: number;

  @JoinColumn([{ name: 'teamId', referencedColumnName: 'id' }])
  team: Team;

  @Column()
  teamId: number;

  @Column()
  order: number;

  @OneToMany(() => Game, (game) => game.awayTeam)
  gamesAsAwayTeam: Game[];

  @OneToMany(() => Game, (game) => game.homeTeam)
  gamesAsHomeTeam: Game[];
}
