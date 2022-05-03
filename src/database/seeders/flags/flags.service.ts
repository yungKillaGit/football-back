import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Flag } from 'modules/flags/entities/flag.entity';
import { Repository } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs/promises';
import { GenericSeeder } from 'database/seeders/generic-seeder';

@Injectable()
export class FlagsSeederService extends GenericSeeder<Flag> {
  constructor(
    @InjectRepository(Flag)
    repository: Repository<Flag>,
    logger: Logger,
  ) {
    super(repository, logger, Flag.name);
  }

  async create() {
    const flagPath = path.resolve(__dirname, '../../../../public/flags');
    try {
      await fs.access(flagPath);
    } catch (e) {
      return Promise.reject(e);
    }
    const files = await fs.readdir(flagPath);
    const flags = this.repository.create(
      files.map((x) => ({ path: `flags/${x}` })),
    );
    return super.create(flags);
  }
}
