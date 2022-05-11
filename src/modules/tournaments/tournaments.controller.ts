import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Tournament } from './entities/tournament.entity';
import { TournamentsService } from './tournaments.service';

@Crud({
  model: {
    type: Tournament,
  },
})
@Controller('tournaments')
export class TournamentsController implements CrudController<Tournament> {
  constructor(public service: TournamentsService) {}
}
