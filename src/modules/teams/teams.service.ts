import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Team } from 'modules/teams/entities/team.entity';
import { Repository } from 'typeorm';
import { FlagsService } from '../flags/flags.service';
import { CreateTeamDto, UpdateTeamDto } from './dto/team.dto';
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

  async createTeam(
    req: CrudRequest,
    createTeamDto: CreateTeamDto,
  ): Promise<Team> {
    const { players, ...team } = createTeamDto;
    if (!team.flagId) {
      team.flagId = (await this.flagsService.getDefaultFlag()).id;
    }
    const savedTeam = await this.createOne(req, team);
    const teamPlayers = this.playersRepository.create(players).map((x) => ({ ...x, team: savedTeam }));

    await this.playersRepository.insert(teamPlayers);

    return this.getOne(req);
  }

  async updateTeam(
    req: CrudRequest,
    updateTeamDto: UpdateTeamDto,
  ) {
    const { players: { changed, deleted }, ...team } = updateTeamDto;
    if (!team.flagId) {
      team.flagId = (await this.flagsService.getDefaultFlag()).id;
    }
    const savedTeam = await this.updateOne(req, team);

    const changedPlayers = this.playersRepository.create(changed).map((x) => ({ ...x, team: savedTeam }));
    const deletedPlayers = this.playersRepository.create(deleted);

    await this.playersRepository.save(changedPlayers);
    await this.playersRepository.remove(deletedPlayers);

    return this.getOne(req);
  }
}
