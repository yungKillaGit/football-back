import { GroupTeam } from '@entities/group-team.entity';
import { TournamentGroup } from '@entities/tournament-group.entity';
import { TournamentStage } from '@entities/tournament-stage.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { In, Repository } from 'typeorm';
import { Team } from '@entities/team.entity';
import { Tournament } from '@entities/tournament.entity';
import { TournamentGamesService } from '../tournament-games/tournament-games.service';
import { GroupTeamsDto } from './dto/group-teams.dto';
import { CreateTournamentDto, UpdateTournamentDto } from './dto/tournament.dto';
import { StageName } from './types/StageName';

@Injectable()
export class TournamentsService extends TypeOrmCrudService<Tournament> {
  constructor(
    @InjectRepository(Tournament) repo,
    @InjectRepository(Team)
    private readonly teamsRepo: Repository<Team>,
    @InjectRepository(TournamentGroup)
    private readonly groupsRepo: Repository<TournamentGroup>,
    @InjectRepository(GroupTeam)
    private readonly groupTeamsRepo: Repository<GroupTeam>,
    @InjectRepository(TournamentStage)
    private readonly stagesRepo: Repository<TournamentStage>,
    private readonly gamesService: TournamentGamesService,
  ) {
    super(repo);
  }

  async create(
    req: CrudRequest,
    { participatingTeams, ...tournamentDto }: CreateTournamentDto,
  ) {
    const tournament = this.repo.create(tournamentDto);
    let saved = await this.repo.save(tournament);
    saved.teams = await this.teamsRepo.findBy({
      id: In(participatingTeams),
    });
    saved = await this.repo.save(saved);

    const tournamentGroups = ['a', 'b', 'c', 'd', 'e', 'f'].map((x) => this.groupsRepo.create({
      name: x.toUpperCase(),
      tournament: saved,
    }));
    await this.groupsRepo.insert(tournamentGroups);

    const tournamentStages = [
      StageName.GroupStage,
      StageName.RoundOf16,
      StageName.QuarterFinal,
      StageName.SemiFinal,
      StageName.Final,
    ].map((x) => this.stagesRepo.create({
      tournament: saved,
      name: x,
    }));
    await this.stagesRepo.insert(tournamentStages);

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

  async allocateTeams(
    tournamentId: number,
    dto: GroupTeamsDto,
  ) {
    const groupStage = await this.stagesRepo.findOneBy({ tournamentId, name: StageName.GroupStage });

    const groupTeams = Object.keys(dto).reduce((acc, key) => {
      const tournamentGroupId = +key;
      const teams = dto[tournamentGroupId];
      return acc.concat(teams.map(({ id, order }) => this.groupTeamsRepo.create({
        groupId: tournamentGroupId,
        teamId: id,
        order,
        stage: groupStage,
      })));
    }, []);
    await this.groupTeamsRepo.insert(groupTeams);

    const tournament = await this.repo.findOneBy({ id: tournamentId });
    tournament.ready = true;
    await this.repo.save(tournament);

    await this.gamesService.generateStageGames(groupStage.id, tournamentId);

    return this.repo.findOne({
      where: { id: tournamentId },
      relations: [
        'tournamentGroups',
      ],
    });
  }
}
