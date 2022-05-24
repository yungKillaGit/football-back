import {
  Controller, Param, ParseIntPipe, Post,
} from '@nestjs/common';
import { TournamentGamesService } from './tournament-games.service';

@Controller('tournaments/:tournamentId/games')
export class TournamentGamesController {
  constructor(private readonly tournamentGamesService: TournamentGamesService) {}

  @Post(':stageId')
  generateStageGames(
    @Param('stageId', ParseIntPipe) stageId: number,
    @Param('tournamentId', ParseIntPipe) tournamentId: number,
  ) {
    return this.tournamentGamesService.generateStageGames(stageId, tournamentId);
  }
}
