import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Flag } from 'modules/flags/entities/flag.entity';
import { Region } from 'modules/regions/entities/region.entity';
import { Team } from 'modules/teams/entities/team.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        migrationsTableName: 'migration',
        migrations: ['dist/migrations/*.js'],
        entities: [Flag, Region, Team],
        synchronize: +configService.get('DB_SYNC') === 1,
        migrationsRun: +configService.get('DB_RUN_MIGRATIONS') === 1,
        logging: +configService.get('DB_LOGGING') === 1,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class PostgresDBProviderModule {}
