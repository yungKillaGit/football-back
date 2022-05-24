import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { SimpleBaseModel } from './base-model.entity';
import { GameEvent } from './game-event.entity';
import { Game } from './game.entity';

@Entity('tournament-game-events', { schema: 'public' })
export class TournamentGameEvent extends SimpleBaseModel {
  @Column('integer', { name: 'gameMinute' })
  gameMinute: number;

  @Column('character varying', { name: 'extraInfo' })
  extraInfo: string;

  @JoinColumn([{ name: 'eventId', referencedColumnName: 'id' }])
  event: GameEvent;

  @ManyToOne(() => Game, (games) => games.tournamentGameEvents)
  @JoinColumn([{ name: 'gameId', referencedColumnName: 'id' }])
  game: Game;
}
