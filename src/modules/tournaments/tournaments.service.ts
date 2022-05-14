import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { In, Repository } from 'typeorm';
import { Team } from '../teams/entities/team.entity';
import { CreateTournamentDto, UpdateTournamentDto } from './dto/tournament.dto';
import { Tournament } from './entities/tournament.entity';

@Injectable()
export class TournamentsService extends TypeOrmCrudService<Tournament> {
  constructor(
    @InjectRepository(Tournament) repo,
    @InjectRepository(Team)
    private readonly teamsRepo: Repository<Team>,
  ) {
    super(repo);
  }

  async create(
    req: CrudRequest,
    { participatingTeams, ...tournamentDto }: CreateTournamentDto,
  ) {
    const tournament = this.repo.create(tournamentDto);
    const saved = await this.repo.save(tournament);
    saved.teams = await this.teamsRepo.findBy({
      id: In(participatingTeams),
    });
    await this.repo.save(saved);

    return this.repo.findOneBy({ id: saved.id });
  }

  async update(
    req: CrudRequest,
    id: number,
    { participatingTeams, ...tournamentDto }: UpdateTournamentDto,
  ) {
    const tournament = await this.repo.findOneBy({ id });
    this.repo.merge(tournament, tournamentDto);

    const oldTeams = tournament.teams;
    const newTeams = participatingTeams;

    const addedTeamIds = newTeams.filter((x) => !oldTeams.find((oldTeam) => oldTeam.id === x));

    let updatedTeams = oldTeams.filter((x) => newTeams.includes(x.id));
    const addedTeams = await this.teamsRepo.findBy({ id: In(addedTeamIds) });
    updatedTeams = updatedTeams.concat(addedTeams);

    tournament.teams = updatedTeams;

    await this.repo.save(tournament);

    return this.repo.findOneBy({ id });
  }
}
