import { Injectable, Logger } from '@nestjs/common';
import { FlagsSeederService } from 'database/seeders/flags/flags.service';
import { RegionsSeederService } from 'database/seeders/regions/regions.service';
import { PlayerPositionsSeederService } from 'database/seeders/player-positions/player-positions.service';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly flagsSeederService: FlagsSeederService,
    private readonly regionsSeederService: RegionsSeederService,
    private readonly playerPositionsSeederService: PlayerPositionsSeederService,
  ) {}

  seedFlags() {
    return this.flagsSeederService.create();
  }

  seedRegions() {
    return this.regionsSeederService.create();
  }
  
  seedPlayerPositions() {
    return this.playerPositionsSeederService.create();
  }

  seed() {
    return Promise.all([
      this.seedFlags(),
      this.seedRegions(),
      this.seedPlayerPositions(),
    ]);
  }
}
