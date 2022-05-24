import { GroupTeam } from '@entities/group-team.entity';
import { TournamentGroup } from '@entities/tournament-group.entity';
import { TournamentStage } from '@entities/tournament-stage.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from '@entities/team.entity';
import { Tournament } from '@entities/tournament.entity';
import { TournamentGamesModule } from '../tournament-games/tournament-games.module';
import { TournamentsService } from './tournaments.service';
import { TournamentsController } from './tournaments.controller';

@Module({
  imports: [TypeOrmModule.forFeature([
    Tournament,
    Team,
    TournamentGroup,
    GroupTeam,
    TournamentStage,
  ]), TournamentGamesModule],
  controllers: [TournamentsController],
  providers: [TournamentsService],
})
export class TournamentsModule {}
