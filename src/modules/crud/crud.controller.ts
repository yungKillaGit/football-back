import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CrudService } from 'modules/crud/crud.service';
import { SimpleBaseModel } from 'database/entities/base-model.entity';
import { DeepPartial } from 'typeorm';

export class CrudController<T extends SimpleBaseModel> {
  constructor(private readonly service: CrudService<T>) {}
  
  @Post()
  create(@Body() createDto: DeepPartial<T>) {
    return this.service.create(createDto);
  }
  
  @Get()
  findAll() {
    return this.service.findAll();
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: DeepPartial<T>) {
    return this.service.update(+id, updateDto);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
