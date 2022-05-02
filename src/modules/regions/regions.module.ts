import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from 'modules/regions/entities/region.entity';
import { RegionsService } from './regions.service';
import { RegionsController } from './regions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Region])],
  controllers: [RegionsController],
  providers: [RegionsService],
})
export class RegionsModule {}
