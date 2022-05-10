import faker from '@faker-js/faker';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FlagsService } from '../../../modules/flags/flags.service';
import { PlayerPosition } from '../../../modules/player-positions/entities/player-position.entity';
import { Region } from '../../../modules/regions/entities/region.entity';
import { Player } from '../../../modules/teams/entities/player.entity';
import { Team } from '../../../modules/teams/entities/team.entity';

@Injectable()
export class TeamsSeederService {
  constructor(
    @InjectRepository(Team)
    private readonly repo: Repository<Team>,
    private readonly flagsService: FlagsService,
    @InjectRepository(Region)
    private readonly regionsRepo: Repository<Region>,
    @InjectRepository(Player)
    private readonly playersRepo: Repository<Player>,
    @InjectRepository(PlayerPosition)
    private readonly playerPositionsRepo: Repository<PlayerPosition>,
    private readonly logger: Logger,
  ) {
  }

  async getNewPlayer(team: Team, displayId: number) {
    const player = this.playersRepo.create();
    player.firstName = faker.name.firstName();
    player.lastName = faker.name.lastName();
    player.birthDate = faker.date.past();
    player.shirtNumber = faker.datatype.number({
      min: 1,
      max: 99,
    });
    player.position = await this.playerPositionsRepo.findOneBy({ name: 'Forward' });
    player.team = team;
    player.displayId = displayId;

    return player;
  }

  async createTeam() {
    const team = this.repo.create();
    team.name = faker.word.adjective();
    team.countryCode = faker.address.countryCode('alpha-3');
    team.flag = await this.flagsService.getDefaultFlag();
    team.region = await this.regionsRepo.findOneBy({ name: 'Europe' });

    const savedTeam = await this.repo.save(team);

    const playersNumber = 23;
    const teamPlayers = await Promise.all(Array.from(Array(playersNumber).keys()).map((index) => {
      return this.getNewPlayer(savedTeam, index + 1);
    }));

    await this.playersRepo.save(teamPlayers);
  }

  async create() {
    const teamsNumber = 24;
    return Promise.all(Array.from(Array(teamsNumber).keys()).map(() => this.createTeam()))
      .then(() => {
        this.logger.debug(`${Team.name} seeding completed`);
        return Promise.resolve();
      })
      .catch((e) => {
        this.logger.error(`${Team.name} seeding failed`);
        return Promise.reject(e);
      });
  }
}
