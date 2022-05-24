import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from '@entities/region.entity';
import { RegionsSeederService } from 'database/seeders/regions/regions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Region])],
  providers: [RegionsSeederService, Logger],
  exports: [RegionsSeederService],
})
export class RegionsSeederModule {}
