import { Injectable, Logger } from '@nestjs/common';
import { FlagsSeederService } from 'database/seeders/flags/flags.service';
import { RegionsSeederService } from 'database/seeders/regions/regions.service';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly flagsSeederService: FlagsSeederService,
    private readonly regionsSeederService: RegionsSeederService,
  ) {}

  seedFlags() {
    return this.flagsSeederService.create();
  }

  seedRegions() {
    return this.regionsSeederService.create();
  }

  seed() {
    return Promise.all([this.seedFlags(), this.seedRegions()]);
  }
}
