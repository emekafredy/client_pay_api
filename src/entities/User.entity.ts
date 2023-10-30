import { Entity, Index, Column, BeforeInsert, OneToMany } from 'typeorm';
import bcrypt from 'bcrypt';
import Model from './Model.entity';
import { Employee } from './Employee.entity';
import { RoleEnumType } from '../types/entities';

@Entity()
export class User extends Model {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Index('email_index')
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: RoleEnumType,
    default: RoleEnumType.EMPLOYEE,
  })
  user_type: RoleEnumType.EMPLOYEE;

  @Column({ nullable: true })
  image_url: string;

  @Column({ nullable: true })
  country: string;

  @Column({
    default: false,
  })
  verified: boolean;

  @OneToMany(() => Employee, (employee) => employee.user)
  employees: Employee[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  static async comparePasswords(passwordInput: string, hashedPassword: string) {
    return await bcrypt.compare(passwordInput, hashedPassword);
  }

  toJSON() {
    return { ...this, password: undefined, verified: undefined };
  }
}
