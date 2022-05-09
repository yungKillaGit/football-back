import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Team } from 'modules/teams/entities/team.entity';
import { Repository } from 'typeorm';
import { FlagsService } from '../flags/flags.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { Player } from './entities/player.entity';

@Injectable()
export class TeamsService extends TypeOrmCrudService<Team> {
  constructor(
    @InjectRepository(Team) teamsRepository,
    @InjectRepository(Player)
    private readonly playersRepository: Repository<Player>,
    private readonly flagsService: FlagsService,
  ) {
    super(teamsRepository);
  }

  async createTeam(createTeamDto: CreateTeamDto): Promise<Team> {
    const { players, ...team } = createTeamDto;
    if (!team.flagId) {
      team.flagId = (await this.flagsService.getDefaultFlag()).id;
    }
    const savedTeam = await this.repo.create(team);
    const teamPlayers = this.playersRepository.create(players).map((x) => ({ ...x, team: savedTeam }));
    await this.playersRepository.insert(teamPlayers);
    return this.findOne({ where: { id: savedTeam.id } });
  }
}
