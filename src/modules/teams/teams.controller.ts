import {
  Controller,
} from '@nestjs/common';
import { CrudController } from 'modules/crud/crud.controller';
import { Team } from 'modules/teams/entities/team.entity';
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController extends CrudController<Team> {
  constructor(private readonly teamsService: TeamsService) {
    super(teamsService);
  }
}
