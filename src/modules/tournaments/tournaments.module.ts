import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from '../teams/entities/team.entity';
import { Tournament } from './entities/tournament.entity';
import { TournamentsService } from './tournaments.service';
import { TournamentsController } from './tournaments.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament, Team])],
  controllers: [TournamentsController],
  providers: [TournamentsService],
})
export class TournamentsModule {}
