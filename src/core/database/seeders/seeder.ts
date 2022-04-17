import { Injectable, Logger } from '@nestjs/common';
import { FlagsSeederService } from 'core/database/seeders/flags/flags.service';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly flagsSeederService: FlagsSeederService,
  ) {}

  seedFlags() {
    return this.flagsSeederService.create();
  }

  seed() {
    return this.seedFlags();
  }
}
