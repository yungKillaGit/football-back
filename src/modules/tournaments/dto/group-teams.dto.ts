type TournamentGroupId = number;

export class GroupTeamDto {
  id: number;

  order: number;
}

export class GroupTeamsDto {
  [key: TournamentGroupId]: GroupTeamDto[]
}
