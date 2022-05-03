import { Module } from '@nestjs/common';
import { AppController } from 'app/app.controller';
import { AppService } from 'app/app.service';
import { ConfigModule } from '@nestjs/config';
import { RegionsModule } from 'modules/regions/regions.module';
import { FlagsModule } from 'modules/flags/flags.module';
import { TeamsModule } from 'modules/teams/teams.module';
import { PostgresDBProviderModule } from 'database/providers/postgres/provider.module';
import { PlayerPositionsModule } from 'modules/player-positions/player-positions.module';

@Module({
  imports: [
    PostgresDBProviderModule,
    ConfigModule.forRoot(),
    RegionsModule,
    FlagsModule,
    TeamsModule,
    PlayerPositionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
