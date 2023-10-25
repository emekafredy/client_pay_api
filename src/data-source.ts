import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from './config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
