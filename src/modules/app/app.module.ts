import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionsModule } from 'modules/regions/regions.module';
import { FlagsModule } from 'modules/flags/flags.module';
import { TeamsModule } from 'modules/teams/teams.module';
import { Flag } from 'modules/flags/entities/flag.entity';
import { Region } from 'modules/regions/entities/region.entity';
import { Team } from 'modules/teams/entities/team.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          migrationsTableName: 'migration',
          migrations: ['dist/migrations/*.js'],
          entities: [Flag, Region, Team],
          synchronize: false,
          migrationsRun: true,
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
    RegionsModule,
    FlagsModule,
    TeamsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
