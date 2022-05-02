import { Injectable } from '@nestjs/common';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { SimpleBaseModel } from 'database/entities/base-model.entity';

@Injectable()
export class CrudService<T extends SimpleBaseModel> {
  constructor(
    protected readonly repository: Repository<T>,
  ) {}
  
  create(createDto: DeepPartial<T>) {
    const team = this.repository.create(createDto);
    return this.repository.save(team);
  }
  
  findAll() {
    return this.repository.find();
  }
  
  findOne(id: number) {
    return this.repository.findOneByOrFail({ id } as FindOptionsWhere<T>);
  }
  
  async update(id: number, updateDto: DeepPartial<T>) {
    const found = await this.findOne(id);
    this.repository.merge(found, updateDto);
    return this.repository.save(found);
  }
  
  async remove(id: number) {
    const found = await this.findOne(id);
    await this.repository.remove(found);
  }
}
