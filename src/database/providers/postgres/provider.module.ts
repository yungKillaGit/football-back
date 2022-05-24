import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { entities } from '../../entities';

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
        synchronize: +configService.get('DB_SYNC') === 1,
        migrationsRun: +configService.get('DB_RUN_MIGRATIONS') === 1,
        logging: +configService.get('DB_LOGGING') === 1,
        entities,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class PostgresDBProviderModule {}
