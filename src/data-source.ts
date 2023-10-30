import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { postgresConfig, testPostgresConfig } from './config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  ...postgresConfig,
  synchronize: true,
  logging: false,
  entities: ['src/entities/*.entity.{js,ts}'],
  migrations: ['migration/**/*{.ts,.js}'],
  subscribers: [],
});

export const testDBConfig: DataSourceOptions = {
  type: 'postgres',
  ...testPostgresConfig,
  synchronize: true,
  dropSchema: true,
  entities: ['src/entities/*.entity.{js,ts}'],
};
export const TestAppDataSource = new DataSource(testDBConfig);
