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
  replaceOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UpdateTeamDto,
    @Param('id') id: string,
  ) {
    return this.service.updateTeam(req, +id, dto);
  }

  @Override()
  async deleteOne(
    @ParsedRequest() req: CrudRequest,
  ) {
    return this.service.delete(req);
  }
}
