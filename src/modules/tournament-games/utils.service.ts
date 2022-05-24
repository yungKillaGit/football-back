import { Game } from '@entities/game.entity';
import { GroupTeam } from '@entities/group-team.entity';
import { TournamentStage } from '@entities/tournament-stage.entity';
import { Tournament } from '@entities/tournament.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StageName } from '../tournaments/types/StageName';

export const roundOf16Mapping = {
  ABCD: {
    4: 'C',
    2: 'D',
    5: 'A',
    3: 'B',
  },
  ABCE: {
    4: 'C',
    2: 'A',
    5: 'B',
    3: 'E',
  },
  ABCF: {
    4: 'C',
    2: 'A',
    5: 'B',
    3: 'F',
  },
  ABDE: {
    4: 'D',
    2: 'A',
    5: 'B',
    3: 'E',
  },
  ABDF: {
    4: 'D',
    2: 'A',
    5: 'B',
    3: 'F',
  },
  ABEF: {
    4: 'E',
    2: 'A',
    5: 'B',
    3: 'F',
  },
  ACDE: {
    4: 'C',
    2: 'D',
    5: 'A',
    3: 'E',
  },
  ACDF: {
    4: 'C',
    2: 'D',
    5: 'A',
    3: 'F',
  },
  ACEF: {
    4: 'C',
    2: 'A',
    5: 'F',
    3: 'E',
  },
  ADEF: {
    4: 'D',
    2: 'F',
    5: 'A',
    3: 'E',
  },
  BCDE: {
    4: 'C',
    2: 'D',
    5: 'B',
    3: 'E',
  },
  BCDF: {
    4: 'C',
    2: 'D',
    5: 'B',
    3: 'F',
  },
  BCEF: {
    4: 'E',
    2: 'C',
    5: 'B',
    3: 'F',
  },
  BDEF: {
    4: 'E',
    2: 'D',
    5: 'B',
    3: 'F',
  },
  CDEF: {
    4: 'C',
    2: 'D',
    5: 'F',
    3: 'E',
  },
};

@Injectable()
export class TournamentGamesUtils {
  constructor(
    @InjectRepository(TournamentStage)
    private readonly stagesRepo: Repository<TournamentStage>,
    @InjectRepository(Tournament)
    private readonly tournamentsRepo: Repository<Tournament>,
    @InjectRepository(Game)
    private readonly gamesRepo: Repository<Game>,
  ) {
  }

  getDefaultGame(homeTeam: GroupTeam, awayTeam: GroupTeam, stage: TournamentStage, order?: number) {
    return this.gamesRepo.create({
      homeTeamPoints: 0,
      awayTeamPoints: 0,
      homeTeam,
      awayTeam,
      stage,
      order,
    });
  }

  async sortTeamsByRating(stage: TournamentStage, teams: GroupTeam[]) {
    const getTeamGoals = (teamGames: Game[], isHome: boolean) => {
      return teamGames.reduce((acc, game) => {
        return {
          scored: acc.scored + (isHome ? game.homeTeamPoints : game.awayTeamPoints),
          conceded: acc.conceded + (isHome ? game.awayTeamPoints : game.homeTeamPoints),
        };
      }, {
        scored: 0,
        conceded: 0,
      });
    };

    const getAllTeamGoals = (team: GroupTeam) => {
      const stageHomeTeamGames = team.gamesAsHomeTeam.filter((x) => x.stageId === stage.id);
      const stageAwayTeamGames = team.gamesAsAwayTeam.filter((x) => x.stageId === stage.id);

      const goalsAsHomeTeam = getTeamGoals(stageHomeTeamGames, true);
      const goalsAsAwayTeam = getTeamGoals(stageAwayTeamGames, false);

      return {
        scored: goalsAsHomeTeam.scored + goalsAsAwayTeam.scored,
        conceded: goalsAsHomeTeam.conceded + goalsAsAwayTeam.conceded,
      };
    };

    const sortTeamsByRating = (teamA, teamB) => {
      const teamAGoals = getAllTeamGoals(teamA);
      const teamBGoals = getAllTeamGoals(teamB);

      const teamAPoints = teamAGoals.scored - teamAGoals.conceded;
      const teamBPoints = teamBGoals.scored - teamBGoals.conceded;

      return (teamBPoints - teamAPoints)
        || (teamBGoals.scored - teamAGoals.scored)
        || Math.random() - Math.random();
    };

    return teams.sort(sortTeamsByRating);
  }

  getStage(tournamentId: number, name: StageName) {
    return this.stagesRepo.findOne({
      where: {
        tournamentId,
        name,
      },
      relations: [
        'games',
        'teams',
        'teams.gamesAsAwayTeam',
        'teams.gamesAsHomeTeam',
        'teams.group',
        'games.awayTeam',
        'games.homeTeam',
      ],
    });
  }

  getWinner(game: Game) {
    if (game.awayTeamPoints === game.homeTeamPoints) {
      return Math.random() > 0.5 ? game.awayTeam : game.homeTeam;
    }
    return game.awayTeamPoints > game.homeTeamPoints ? game.awayTeam : game.homeTeam;
  }
}
