import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flag } from '@entities/flag.entity';
import { FlagsService } from '../../../modules/flags/flags.service';
import { PlayerPosition } from '@entities/player-position.entity';
import { Region } from '@entities/region.entity';
import { Player } from '@entities/player.entity';
import { Team } from '@entities/team.entity';
import { TeamsSeederService } from './teams.service';

@Module({
  imports: [TypeOrmModule.forFeature([Team, Player, Flag, Region, PlayerPosition])],
  providers: [TeamsSeederService, Logger, FlagsService],
  exports: [TeamsSeederService],
})
export class TeamsSeederModule {}
