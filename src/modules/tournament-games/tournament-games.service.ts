import { groupBy } from '@common/utils/common';
import { Game } from '@entities/game.entity';
import { TournamentGroup } from '@entities/tournament-group.entity';
import { TournamentStage } from '@entities/tournament-stage.entity';
import { Tournament } from '@entities/tournament.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { bindCallback } from 'rxjs';
import { Repository } from 'typeorm';
import { StageName } from '../tournaments/types/StageName';
import { roundOf16Mapping, TournamentGamesUtils } from './utils.service';

@Injectable()
export class TournamentGamesService {
  constructor(
    @InjectRepository(TournamentStage)
    private readonly stagesRepo: Repository<TournamentStage>,
    @InjectRepository(Tournament)
    private readonly tournamentsRepo: Repository<Tournament>,
    @InjectRepository(Game)
    private readonly gamesRepo: Repository<Game>,
    private readonly utils: TournamentGamesUtils,
  ) {
  }

  async generateGroupStageGames(
    stage: TournamentStage,
    tournament: Tournament,
  ) {
    const generateGamesForEachGroup = (group: TournamentGroup) => {
      const [a1, a2, a3, a4] = group.groupTeams;

      const games: Game[] = [
        this.utils.getDefaultGame(a1, a2, stage, 0),
        this.utils.getDefaultGame(a3, a4, stage, 1),
        this.utils.getDefaultGame(a2, a4, stage, 2),
        this.utils.getDefaultGame(a1, a3, stage, 3),
        this.utils.getDefaultGame(a4, a1, stage, 4),
        this.utils.getDefaultGame(a2, a3, stage, 5),
      ];

      return this.gamesRepo.insert(games);
    };

    return Promise.all(tournament.tournamentGroups.map((group) => {
      return generateGamesForEachGroup(group);
    }));
  }

  async generateRoundOf16Games(
    stage: TournamentStage,
    tournament: Tournament,
  ) {
    const groupStage = await this.utils.getStage(tournament.id, StageName.GroupStage);

    const teamsByGroup = groupBy(stage.teams.slice(), (team) => team.group.name);
    await Promise.all(Object.values(teamsByGroup).map((stageGroupTeams) => {
      return this.utils.sortTeamsByRating(groupStage, stageGroupTeams);
    }));

    const {
      A, B, C, D, E, F,
    } = teamsByGroup;

    const thirdRanked = Object.keys(teamsByGroup).map((groupName) => {
      return teamsByGroup[groupName][2];
    });
    await this.utils.sortTeamsByRating(groupStage, thirdRanked);

    const fourBest = thirdRanked.slice(0, 3).map((x) => x.group.name).join('');

    const af2AwayTeamGroup = roundOf16Mapping[fourBest][2];
    const af3AwayTeamGroup = roundOf16Mapping[fourBest][3];
    const af4AwayTeamGroup = roundOf16Mapping[fourBest][4];
    const af5AwayTeamGroup = roundOf16Mapping[fourBest][5];

    const games = [
      this.utils.getDefaultGame(A[1], C[1], stage),
      this.utils.getDefaultGame(B[0], teamsByGroup[af2AwayTeamGroup][2], stage),
      this.utils.getDefaultGame(D[0], teamsByGroup[af3AwayTeamGroup][2], stage),
      this.utils.getDefaultGame(A[0], teamsByGroup[af4AwayTeamGroup][2], stage),
      this.utils.getDefaultGame(C[0], teamsByGroup[af5AwayTeamGroup][2], stage),
      this.utils.getDefaultGame(F[0], E[1], stage),
      this.utils.getDefaultGame(E[0], D[1], stage),
      this.utils.getDefaultGame(B[1], F[1], stage),
    ].map((game, index) => ({
      ...game,
      order: index,
    }));

    return this.gamesRepo.insert(games);
  }

  async generateQuarterFinalGames(
    stage: TournamentStage,
    tournament: Tournament,
  ) {
    const prevStage = await this.utils.getStage(tournament.id, StageName.RoundOf16);
    const [af1, af2, af3, af4, af5, af6, af7, af8] = prevStage.games;

    const games = [
      this.utils.getDefaultGame(this.utils.getWinner(af1), this.utils.getWinner(af3), stage),
      this.utils.getDefaultGame(this.utils.getWinner(af2), this.utils.getWinner(af6), stage),
      this.utils.getDefaultGame(this.utils.getWinner(af5), this.utils.getWinner(af7), stage),
      this.utils.getDefaultGame(this.utils.getWinner(af4), this.utils.getWinner(af8), stage),
    ].map((game, index) => ({
      ...game,
      order: index,
    }));

    return this.gamesRepo.insert(games);
  }

  async generateSemiFinalGames(
    stage: TournamentStage,
    tournament: Tournament,
  ) {
    const prevStage = await this.utils.getStage(tournament.id, StageName.QuarterFinal);
    const [qf1, qf2, qf3, qf4] = prevStage.games;

    const games = [
      this.utils.getDefaultGame(this.utils.getWinner(qf1), this.utils.getWinner(qf2), stage),
      this.utils.getDefaultGame(this.utils.getWinner(qf3), this.utils.getWinner(qf4), stage),
    ].map((game, index) => ({
      ...game,
      order: index,
    }));

    return this.gamesRepo.insert(games);
  }

  async generateFinalGame(
    stage: TournamentStage,
    tournament: Tournament,
  ) {
    const prevStage = await this.utils.getStage(tournament.id, StageName.SemiFinal);
    const [sf1, sf2] = prevStage.games;

    return this.gamesRepo.insert([
      this.utils.getDefaultGame(this.utils.getWinner(sf1), this.utils.getWinner(sf2), stage),
    ]);
  }

  async generateStageGames(
    stageId: number,
    tournamentId: number,
  ) {
    const stage = await this.stagesRepo.findOneBy({ id: stageId });
    const tournament = await this.tournamentsRepo.findOne({
      where: { id: tournamentId },
      relations: [
        'tournamentGroups',
        'tournamentGroups.groupTeams',
      ],
    });

    if (stage.name === StageName.GroupStage) {
      return this.generateGroupStageGames(stage, tournament);
    }
    if (stage.name === StageName.RoundOf16) {
      return this.generateRoundOf16Games(stage, tournament);
    }
    if (stage.name === StageName.QuarterFinal) {
      return this.generateQuarterFinalGames(stage, tournament);
    }
    if (stage.name === StageName.SemiFinal) {
      return this.generateSemiFinalGames(stage, tournament);
    }
    if (stage.name === StageName.RoundOf16) {
      return this.generateFinalGame(stage, tournament);
    }
  }
}
