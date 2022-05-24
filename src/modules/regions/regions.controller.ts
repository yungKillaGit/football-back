import { Controller } from '@nestjs/common';
import { CrudController } from 'modules/crud/crud.controller';
import { Region } from '@entities/region.entity';
import { RegionsService } from './regions.service';

@Controller('regions')
export class RegionsController extends CrudController<Region> {
  constructor(private readonly regionsService: RegionsService) {
    super(regionsService);
  }
}
