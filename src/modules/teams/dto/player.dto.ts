import { IsNotEmpty } from 'class-validator';

export class CreatePlayerDto {
  firstName?: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  birthDate: Date;

  @IsNotEmpty()
  shirtNumber: number;

  @IsNotEmpty()
  positionId: number;
}

export class UpdatePlayerDto extends CreatePlayerDto {}
