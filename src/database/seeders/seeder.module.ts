import { Logger, Module } from '@nestjs/common';
import { PostgresDBProviderModule } from 'database/providers/postgres/provider.module';
import { FlagsSeederModule } from 'database/seeders/flags/flags.module';
import { Seeder } from 'database/seeders/seeder';
import { ConfigModule } from '@nestjs/config';
import { RegionsSeederModule } from 'database/seeders/regions/regions.module';

@Module({
  imports: [
    PostgresDBProviderModule,
    ConfigModule.forRoot(),
    FlagsSeederModule,
    RegionsSeederModule,
  ],
  providers: [Logger, Seeder],
})
export class SeederModule {}
