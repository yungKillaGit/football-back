import { IsNotEmpty } from 'class-validator';

export class CreateTournamentDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;

  @IsNotEmpty()
  participatingTeams: number[];
}

export class UpdateTournamentDto extends CreateTournamentDto {}
