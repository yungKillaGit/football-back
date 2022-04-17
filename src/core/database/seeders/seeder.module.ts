import { Logger, Module } from '@nestjs/common';
import { PostgresDBProviderModule } from 'core/providers/database/postgres/provider.module';
import { FlagsSeederModule } from 'core/database/seeders/flags/flags.module';
import { Seeder } from 'core/database/seeders/seeder';
import { ConfigModule } from '@nestjs/config';
import { RegionsSeederModule } from 'core/database/seeders/regions/regions.module';

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
