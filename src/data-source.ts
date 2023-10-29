import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { postgresConfig } from './config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  ...postgresConfig,
  synchronize: true,
  logging: false,
  entities: ['src/entities/*.entity.{js,ts}'],
  migrations: ['migration/**/*{.ts,.js}'],
  subscribers: [],
});
