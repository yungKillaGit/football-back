import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RegionsModule } from 'modules/regions/regions.module';
import { FlagsModule } from 'modules/flags/flags.module';
import { TeamsModule } from 'modules/teams/teams.module';
import { PostgresDBProviderModule } from 'core/providers/database/postgres/provider.module';

@Module({
  imports: [
    PostgresDBProviderModule,
    ConfigModule.forRoot(),
    RegionsModule,
    FlagsModule,
    TeamsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
