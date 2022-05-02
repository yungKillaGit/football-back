import { Injectable } from '@nestjs/common';
import { CrudService } from 'modules/crud/crud.service';
import { Region } from 'modules/regions/entities/region.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RegionsService extends CrudService<Region> {
  constructor(
    @InjectRepository(Region)
    repository: Repository<Region>,
  ) {
    super(repository);
  }
}
