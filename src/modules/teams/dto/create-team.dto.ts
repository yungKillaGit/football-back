import { IsNotEmpty, Length } from 'class-validator';
import { CreatePlayerDto } from './create-player.dto';

export class CreateTeamDto {
  @IsNotEmpty()
  name: string;

  @Length(3, 3)
  countryCode: string;

  @IsNotEmpty()
  regionId: number;

  flagId?: number;

  @IsNotEmpty()
  players: CreatePlayerDto[];
}
