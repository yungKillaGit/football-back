import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flag } from '@entities/flag.entity';
import { FlagsSeederService } from 'database/seeders/flags/flags.service';

@Module({
  imports: [TypeOrmModule.forFeature([Flag])],
  providers: [FlagsSeederService, Logger],
  exports: [FlagsSeederService],
})
export class FlagsSeederModule {}
