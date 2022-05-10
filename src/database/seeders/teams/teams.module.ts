import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flag } from '../../../modules/flags/entities/flag.entity';
import { FlagsService } from '../../../modules/flags/flags.service';
import { PlayerPosition } from '../../../modules/player-positions/entities/player-position.entity';
import { Region } from '../../../modules/regions/entities/region.entity';
import { Player } from '../../../modules/teams/entities/player.entity';
import { Team } from '../../../modules/teams/entities/team.entity';
import { TeamsSeederService } from './teams.service';

@Module({
  imports: [TypeOrmModule.forFeature([Team, Player, Flag, Region, PlayerPosition])],
  providers: [TeamsSeederService, Logger, FlagsService],
  exports: [TeamsSeederService],
})
export class TeamsSeederModule {}
