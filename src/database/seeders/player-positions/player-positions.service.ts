import { Injectable, Logger } from '@nestjs/common';
import { GenericSeeder } from 'database/seeders/generic-seeder';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerPosition } from '@entities/player-position.entity';
import { playerPositionsSeedData } from 'database/seeders/player-positions/data';

@Injectable()
export class PlayerPositionsSeederService extends GenericSeeder<PlayerPosition> {
  constructor(
    @InjectRepository(PlayerPosition)
    repository: Repository<PlayerPosition>,
    logger: Logger,
  ) {
    super(repository, logger, PlayerPosition.name, playerPositionsSeedData);
  }
}
