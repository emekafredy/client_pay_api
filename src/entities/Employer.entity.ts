import { Entity, Index, Column, OneToOne, JoinColumn } from 'typeorm';
import Model from './Model.entity';
import { User } from './User.entity';
import { PayFrequencyEnumType } from '../types/entities';

@Entity()
export class Employer extends Model {
  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column()
  logo_url: string;

  @Column()
  country: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  employee_pay_date: Date;

  @Column({
    type: 'enum',
    enum: PayFrequencyEnumType,
    default: PayFrequencyEnumType.MONTHLY,
  })
  employee_pay_frequency: PayFrequencyEnumType.MONTHLY;
}
