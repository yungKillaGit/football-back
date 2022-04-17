import { Injectable } from '@nestjs/common';
import { CreateFlagDto } from './dto/create-flag.dto';
import { UpdateFlagDto } from './dto/update-flag.dto';

@Injectable()
export class FlagsService {
  create(createFlagDto: CreateFlagDto) {
    return 'This action adds a new flag';
  }

  findAll() {
    return `This action returns all flags`;
  }

  findOne(id: number) {
    return `This action returns a #${id} flag`;
  }

  update(id: number, updateFlagDto: UpdateFlagDto) {
    return `This action updates a #${id} flag`;
  }

  remove(id: number) {
    return `This action removes a #${id} flag`;
  }
}
