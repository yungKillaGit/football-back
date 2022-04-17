import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Flag } from 'modules/flags/entities/flag.entity';
import { Repository } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs/promises';

@Injectable()
export class FlagsSeederService {
  constructor(
    @InjectRepository(Flag)
    private readonly flagsRepository: Repository<Flag>,
    private readonly logger: Logger,
  ) {}

  async create() {
    const existingFlagsNumber = await this.flagsRepository.count();
    if (existingFlagsNumber > 0) {
      return;
    }

    const flagPath = path.resolve(__dirname, '../../../../../public/flags');
    try {
      await fs.access(flagPath);
    } catch (e) {
      return Promise.reject(e);
    }

    try {
      const files = await fs.readdir(flagPath);
      if (files) {
        const flags = this.flagsRepository.create(
          files.map((x) => ({ path: `flags/${x}` })),
        );
        return this.flagsRepository
          .save(flags)
          .then(() => {
            this.logger.log('Flags seeding completed');
            return Promise.resolve();
          })
          .catch((e) => {
            this.logger.error('Flags seeding failed');
            return Promise.reject(e);
          });
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
