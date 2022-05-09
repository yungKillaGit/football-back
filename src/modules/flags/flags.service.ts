import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Not, Repository } from 'typeorm';
import { Flag } from './entities/flag.entity';

@Injectable()
export class FlagsService {
  private readonly DEFAULT_FLAG_PATTERN = '%default.png';

  constructor(
    @InjectRepository(Flag)
    private readonly repository: Repository<Flag>,
  ) {
  }

  getDefaultFlag() {
    return this.repository.findOneByOrFail({
      path: Like(this.DEFAULT_FLAG_PATTERN),
    });
  }

  async findAll() {
    return this.repository.find({
      where: {
        path: Not(Like(this.DEFAULT_FLAG_PATTERN)),
      },
    });
  }
}
