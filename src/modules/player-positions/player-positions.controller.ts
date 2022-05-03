import {
  Controller, Get,
} from '@nestjs/common';
import { PlayerPositionsService } from './player-positions.service';

@Controller('player-positions')
export class PlayerPositionsController {
  constructor(private readonly playerPositionsService: PlayerPositionsService) {}

  @Get()
  findAll() {
    return this.playerPositionsService.findAll();
  }
}
