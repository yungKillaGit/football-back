import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from '@entities/team.entity';
import { Flag } from '@entities/flag.entity';
import { FlagsService } from '../flags/flags.service';
import { Region } from '@entities/region.entity';
import { Player } from '@entities/player.entity';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Team, Player, Flag, Region])],
  controllers: [TeamsController],
  providers: [TeamsService, FlagsService],
})
export class TeamsModule {}
