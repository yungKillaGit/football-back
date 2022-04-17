import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseModel } from 'core/entities/base-model.entity';
import { Flag } from 'modules/flags/entities/flag.entity';
import { Region } from 'modules/regions/entities/region.entity';

@Entity({ name: 'teams' })
export class Team extends BaseModel {
  @Column()
  name: string;

  @Column()
  countryCode: string;

  @OneToOne(() => Flag)
  @JoinColumn()
  flag?: Flag;

  @OneToOne(() => Region)
  @JoinColumn()
  region: Region;
}
