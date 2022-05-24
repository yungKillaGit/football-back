import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerPosition } from '@entities/player-position.entity';
import { PlayerPositionsService } from './player-positions.service';
import { PlayerPositionsController } from './player-positions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerPosition])],
  controllers: [PlayerPositionsController],
  providers: [PlayerPositionsService],
})
export class PlayerPositionsModule {}
