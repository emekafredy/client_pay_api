import { Entity, Column } from 'typeorm';
import Model from './Model.entity';

@Entity()
export class Invitation extends Model {
  @Column()
  email: string;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  invited_at: Date;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  accepted_at: Date;
}
