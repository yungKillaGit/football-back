import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from 'modules/teams/entities/team.entity';
import { Repository } from 'typeorm';
import { CrudService } from 'modules/crud/crud.service';

@Injectable()
export class TeamsService extends CrudService<Team> {
  constructor(
    @InjectRepository(Team)
    teamsRepository: Repository<Team>,
  ) {
    super(teamsRepository);
  }
}
