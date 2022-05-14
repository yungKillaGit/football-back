import { Controller, Param } from '@nestjs/common';
import {
  Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest,
} from '@nestjsx/crud';
import { CreateTournamentDto, UpdateTournamentDto } from './dto/tournament.dto';
import { Tournament } from './entities/tournament.entity';
import { TournamentsService } from './tournaments.service';

@Crud({
  model: {
    type: Tournament,
  },
  dto: {
    create: CreateTournamentDto,
    update: UpdateTournamentDto,
  },
  query: {
    join: {
      teams: {
        eager: true,
      },
    },
  },
  routes: {
    deleteOneBase: {
      returnDeleted: true,
    },
  },
})
@Controller('tournaments')
export class TournamentsController implements CrudController<Tournament> {
  constructor(public service: TournamentsService) {}

  @Override()
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateTournamentDto,
  ) {
    return this.service.create(req, dto);
  }

  @Override()
  replaceOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UpdateTournamentDto,
    @Param('id') id: number,
  ) {
    return this.service.update(req, id, dto);
  }
}
