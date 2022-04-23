import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from 'modules/teams/entities/team.entity';
import { Repository } from 'typeorm';
import { UpdateTeamDto } from './dto/update-team.dto';
import { CreateTeamDto } from './dto/create-team.dto';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamsRepository: Repository<Team>,
  ) {}

  create(createTeamDto: CreateTeamDto) {
    const team = this.teamsRepository.create(createTeamDto);
    return this.teamsRepository.save(team);
  }

  findAll() {
    return this.teamsRepository.find();
  }

  findOne(id: number) {
    return this.teamsRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    const foundTeam = await this.findOne(id);
    this.teamsRepository.merge(foundTeam, updateTeamDto);
    return this.teamsRepository.save(foundTeam);
  }

  async remove(id: number) {
    const foundTeam = await this.findOne(id);
    await this.teamsRepository.remove(foundTeam);
  }
}
