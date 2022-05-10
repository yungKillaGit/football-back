import { IsNotEmpty, Length } from 'class-validator';
import { CreatePlayerDto, UpdatePlayerDto } from './player.dto';

class TeamDto {
  @IsNotEmpty()
  name: string;

  @Length(3, 3)
  countryCode: string;

  @IsNotEmpty()
  regionId: number;

  flagId?: number;
}

export class CreateTeamDto extends TeamDto {
  @IsNotEmpty()
  players: CreatePlayerDto[];
}

export class UpdateTeamDto extends TeamDto {
  players: {
    changed: UpdatePlayerDto[];
    deleted: UpdatePlayerDto[];
  };
}
