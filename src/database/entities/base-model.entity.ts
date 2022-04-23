import {
  Column,
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

  @Column({ default: false })
  deleted: boolean;
}

@Entity()
export class SimpleBaseModel {
  @PrimaryGeneratedColumn('increment')
  id: number;
}
