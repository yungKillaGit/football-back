import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from 'app/app.controller';
import { AppService } from 'app/app.service';
import { ConfigModule } from '@nestjs/config';
import { RegionsModule } from 'modules/regions/regions.module';
import { FlagsModule } from 'modules/flags/flags.module';
import { TeamsModule } from 'modules/teams/teams.module';
import { PostgresDBProviderModule } from 'database/providers/postgres/provider.module';
import { PlayerPositionsModule } from 'modules/player-positions/player-positions.module';
import { LoggerMiddleware } from '../common/middlewares/logger.middleware';
import { TournamentsModule } from '../modules/tournaments/tournaments.module';

@Module({
  imports: [
    PostgresDBProviderModule,
    ConfigModule.forRoot(),
    RegionsModule,
    FlagsModule,
    TeamsModule,
    PlayerPositionsModule,
    TournamentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
