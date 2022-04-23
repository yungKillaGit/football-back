import { Injectable, Logger } from '@nestjs/common';
import { GenericSeeder } from 'database/seeders/generic-seeder';
import { Region } from 'modules/regions/entities/region.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { regionsSeedData } from 'database/seeders/regions/data';

@Injectable()
export class RegionsSeederService extends GenericSeeder<Region> {
  constructor(
    @InjectRepository(Region)
    repository: Repository<Region>,
    logger: Logger,
  ) {
    super(repository, logger, Region.name, regionsSeedData);
  }
}
