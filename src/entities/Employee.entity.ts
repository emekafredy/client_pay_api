import { Entity, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import Model from './Model.entity';
import { User } from './User.entity';
import { Employer } from './Employer.entity';
import { EmploymentEnumType, CurrencyEnumType } from '../types/entities';

@Entity()
export class Employee extends Model {
  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: CurrencyEnumType,
    default: CurrencyEnumType.NGN,
  })
  currency: CurrencyEnumType.NGN;

  @Column()
  country: string;

  @Column({
    type: 'enum',
    enum: EmploymentEnumType,
    default: EmploymentEnumType.FULLTIME,
  })
  employment_type: EmploymentEnumType.FULLTIME;

  @ManyToOne(() => User, (user) => user.employees)
  user: User;

  @OneToOne(() => Employer)
  @JoinColumn()
  employer: Employer;
}
