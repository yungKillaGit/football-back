export class CreatePlayerDto {
  firstName?: string;

  lastName: string;

  birthDate: Date;

  shirtNumber: number;

  positionId: number;
}

export class UpdatePlayerDto extends CreatePlayerDto {
  id: number;
}
