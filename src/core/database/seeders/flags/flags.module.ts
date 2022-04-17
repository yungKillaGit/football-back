import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flag } from 'modules/flags/entities/flag.entity';
import { FlagsSeederService } from 'core/database/seeders/flags/flags.service';

@Module({
  imports: [TypeOrmModule.forFeature([Flag])],
  providers: [FlagsSeederService, Logger],
  exports: [FlagsSeederService],
})
export class FlagsSeederModule {}
