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
    id: number,
    updateTeamDto: UpdateTeamDto,
  ) {
    const { players: { changed, deleted }, ...team } = updateTeamDto;

    const teamObj = await this.repo.findOneBy({ id });
    this.repo.merge(teamObj, team);

    await this.repo.save(teamObj);

    const changedPlayers = this.playersRepository.create(changed).map((x) => ({ ...x, team: teamObj }));
    const deletedPlayers = this.playersRepository.create(deleted);

    await this.playersRepository.save(changedPlayers);
    await this.playersRepository.remove(deletedPlayers);

    return this.getOne(req);
  }

  async delete(req: CrudRequest) {
    const deletedTeam = await this.getOne(req);
    await this.playersRepository.remove(deletedTeam.players);
    return this.deleteOne(req);
  }
}
