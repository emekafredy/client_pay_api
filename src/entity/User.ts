import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Date } from "./Date";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  image_url: string;

  @Column(() => Date, { prefix: false })
  date: Date;
}
