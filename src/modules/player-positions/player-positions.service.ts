import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerPosition } from './entities/player-position.entity';

@Injectable()
export class PlayerPositionsService {
  constructor(
    @InjectRepository(PlayerPosition)
    private readonly repository: Repository<PlayerPosition>,
  ) {
  }

  findAll() {
    return this.repository.find();
  }
}
