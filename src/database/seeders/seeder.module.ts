import { Logger, Module } from '@nestjs/common';
import { PostgresDBProviderModule } from 'database/providers/postgres/provider.module';
import { FlagsSeederModule } from 'database/seeders/flags/flags.module';
import { Seeder } from 'database/seeders/seeder';
import { ConfigModule } from '@nestjs/config';
import { RegionsSeederModule } from 'database/seeders/regions/regions.module';
import { PlayerPositionsSeederModule } from 'database/seeders/player-positions/player-positions.module';
import { TeamsSeederModule } from './teams/teams.module';

@Module({
  imports: [
    PostgresDBProviderModule,
    ConfigModule.forRoot(),
    FlagsSeederModule,
    RegionsSeederModule,
    PlayerPositionsSeederModule,
    TeamsSeederModule,
  ],
  providers: [Logger, Seeder],
})
export class SeederModule {}
