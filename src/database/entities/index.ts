import { Flag } from 'modules/flags/entities/flag.entity';
import { Region } from 'modules/regions/entities/region.entity';
import { Team } from 'modules/teams/entities/team.entity';
import { PlayerPosition } from 'modules/player-positions/entities/player-position.entity';
import { Player } from '../../modules/teams/entities/player.entity';
import { Tournament } from '../../modules/tournaments/entities/tournament.entity';

export const entities = [
  Flag,
  Region,
  Team,
  PlayerPosition,
  Player,
  Tournament,
];
