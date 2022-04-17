import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FlagsService } from './flags.service';
import { CreateFlagDto } from './dto/create-flag.dto';
import { UpdateFlagDto } from './dto/update-flag.dto';

@Controller('flags')
export class FlagsController {
  constructor(private readonly flagsService: FlagsService) {}

  @Post()
  create(@Body() createFlagDto: CreateFlagDto) {
    return this.flagsService.create(createFlagDto);
  }

  @Get()
  findAll() {
    return this.flagsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flagsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFlagDto: UpdateFlagDto) {
    return this.flagsService.update(+id, updateFlagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flagsService.remove(+id);
  }
}
