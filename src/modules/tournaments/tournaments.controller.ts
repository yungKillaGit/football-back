import {
  Body, Controller, Param, Post,
} from '@nestjs/common';
import {
  Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest,
} from '@nestjsx/crud';
import { Tournament } from '@entities/tournament.entity';
import { GroupTeamsDto } from './dto/group-teams.dto';
import { CreateTournamentDto, UpdateTournamentDto } from './dto/tournament.dto';
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
      teams: {},
      tournamentGroups: {},
      tournamentStages: {
      },
      'tournamentStages.games': {
        alias: 'games',
      },
      'tournamentStages.games.homeTeam': {
        alias: 'homeTeam',
      },
      'tournamentStages.games.awayTeam': {
        alias: 'awayTeam',
      },
    },
    sort: [
      {
        field: 'created',
        order: 'DESC',
      },
    ],
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

  @Post('/:id/teams')
  allocateTeams(
    @Body() dto: GroupTeamsDto,
    @Param('id') id: number,
  ) {
    return this.service.allocateTeams(id, dto);
  }
}
