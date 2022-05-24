import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerPosition } from '@entities/player-position.entity';
import { PlayerPositionsSeederService } from 'database/seeders/player-positions/player-positions.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerPosition])],
  providers: [PlayerPositionsSeederService, Logger],
  exports: [PlayerPositionsSeederService],
})
export class PlayerPositionsSeederModule {}
