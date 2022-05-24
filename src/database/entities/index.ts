import { Flag } from 'database/entities/flag.entity';
import { Region } from 'database/entities/region.entity';
import { Team } from 'database/entities/team.entity';
import { PlayerPosition } from 'database/entities/player-position.entity';
import { GameEvent } from './game-event.entity';
import { Game } from './game.entity';
import { GroupTeam } from './group-team.entity';
import { Player } from './player.entity';
import { TournamentGameEvent } from './tournament-game-event.entity';
import { TournamentGroup } from './tournament-group.entity';
import { TournamentStage } from './tournament-stage.entity';
import { Tournament } from './tournament.entity';

export const entities = [
  Flag,
  Game,
  GameEvent,
  GroupTeam,
  Player,
  PlayerPosition,
  Region,
  Team,
  Tournament,
  TournamentGameEvent,
  TournamentGroup,
  TournamentStage,
];
