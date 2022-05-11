import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BaseModel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'now()' })
  created: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'now()' })
  updated: Date;
}

@Entity()
export class SimpleBaseModel {
  @PrimaryGeneratedColumn('increment')
  id: number;
}
