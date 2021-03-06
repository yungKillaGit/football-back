import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { PlayerPosition } from './player-position.entity';
import { BaseModel } from './base-model.entity';
import { Team } from './team.entity';

@Entity({ name: 'players', orderBy: { displayId: 'ASC' } })
export class Player extends BaseModel {
  @Column('character varying', { name: 'firstName', nullable: true })
  firstName: string | null;

  @Column('character varying', { name: 'lastName' })
  lastName: string;

  @Column('date', { name: 'birthDate' })
  birthDate: Date;

  @Column('integer', { name: 'shirtNumber' })
  shirtNumber: number;

  @ManyToOne(
    () => PlayerPosition,
    (playerPositions) => playerPositions.players,
  )
  @JoinColumn([{ name: 'positionId', referencedColumnName: 'id' }])
  position: PlayerPosition;

  @Column()
  positionId: number;

  @ManyToOne(() => Team, (teams) => teams.players, { onDelete: 'SET NULL' })
  @JoinColumn([{ name: 'teamId', referencedColumnName: 'id' }])
  team: Team;

  @Column()
  teamId: number;

  @Column()
  displayId: number;
}
