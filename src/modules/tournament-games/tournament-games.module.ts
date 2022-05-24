import { Game } from '@entities/game.entity';
import { TournamentStage } from '@entities/tournament-stage.entity';
import { Tournament } from '@entities/tournament.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournamentGamesService } from './tournament-games.service';
import { TournamentGamesController } from './tournament-games.controller';
import { TournamentGamesUtils } from './utils.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    TournamentStage,
    Tournament,
    Game,
  ])],
  controllers: [TournamentGamesController],
  providers: [TournamentGamesService, TournamentGamesUtils],
  exports: [TournamentGamesService, TournamentGamesUtils],
})
export class TournamentGamesModule {}
