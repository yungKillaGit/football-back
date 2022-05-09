import {
  Controller,
  Get,
} from '@nestjs/common';
import { FlagsService } from './flags.service';

@Controller('country-flags')
export class FlagsController {
  constructor(private readonly flagsService: FlagsService) {}

  @Get()
  findAll() {
    return this.flagsService.findAll();
  }
}
