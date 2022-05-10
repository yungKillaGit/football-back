import {
  Controller,
} from '@nestjs/common';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { CreateTeamDto, UpdateTeamDto } from './dto/team.dto';
import { Team } from './entities/team.entity';
import { TeamsService } from './teams.service';

@Crud({
  model: {
    type: Team,
  },
  query: {
    join: {
      region: {
        eager: true,
      },
      flag: {
        eager: true,
      },
      players: {
        eager: true,
      },
      'players.position': {
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
@Controller('teams')
export class TeamsController implements CrudController<Team> {
  constructor(public service: TeamsService) {}

  @Override()
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateTeamDto,
  ) {
    return this.service.createTeam(req, dto);
  }

  @Override()
  updateOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UpdateTeamDto,
  ) {
    return this.service.updateTeam(req, dto);
  }
}
