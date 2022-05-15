import {
  Controller, Param,
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
  dto: {
    create: CreateTeamDto,
    update: UpdateTeamDto,
  },
  query: {
    join: {
      region: {
        eager: true,
      },
      flag: {
        eager: true,
      },
      players: {},
      'players.position': {},
    },
    sort: [
      {
        field: 'created',
        order: 'DESC',
      },
    ],
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
  replaceOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UpdateTeamDto,
    @Param('id') id: number,
  ) {
    return this.service.updateTeam(req, id, dto);
  }

  @Override()
  async deleteOne(
    @ParsedRequest() req: CrudRequest,
    @Param('id') id: number,
  ) {
    return this.service.delete(req, id);
  }
}
