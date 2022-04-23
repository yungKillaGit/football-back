import { Logger } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';

export class GenericSeeder<T> {
  constructor(
    protected readonly repository: Repository<T>,
    protected readonly logger: Logger,
    protected readonly name: string,
    protected readonly data?: DeepPartial<T>[],
  ) {}

  getData(data?: DeepPartial<T>[]) {
    return this.repository.create(data || this.data);
  }

  async create(data?: T[]) {
    const existingRowsNumber = await this.repository.count();
    if (existingRowsNumber > 0) {
      this.logger.debug(`${this.name} seeding already completed`);
      return;
    }

    try {
      return this.repository
        .save(data || this.getData())
        .then(() => {
          this.logger.debug(`${this.name} seeding completed`);
          return Promise.resolve();
        })
        .catch((e) => {
          this.logger.error(`${this.name} seeding failed`);
          return Promise.reject(e);
        });
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
