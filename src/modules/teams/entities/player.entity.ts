import { PlayerPosition } from 'modules/player-positions/entities/player-position.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { BaseModel } from '../../../database/entities/base-model.entity';
import { Team } from './team.entity';

@Entity({ name: 'players' })
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
}
