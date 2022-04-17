import { IsNotEmpty, Length } from 'class-validator';

export class CreateTeamDto {
  @IsNotEmpty()
  name: string;

  @Length(3, 3)
  countryCode: string;

  @IsNotEmpty()
  regionId: number;

  flagId?: number;
}
