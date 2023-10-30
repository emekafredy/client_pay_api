import dotenv from 'dotenv';
import {
  AuthCredentialsType,
  PostgresConfigType,
  RedisConfigType,
} from '../types/config';

dotenv.config();
export const port = process.env.PORT || 3000;
export const nodeEnv = process.env.NODE_ENV || 'development';

export const postgresConfig: PostgresConfigType = {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT as unknown as number,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
};

export const testPostgresConfig: PostgresConfigType = {
  host: 'localhost',
  port: 2453,
  username: 'user123',
  password: 'pass123',
  database: 'test_db',
};

export const redisConfig: RedisConfigType = {
  redisUrl: process.env.REDIS_URL,
  redisCacheExpiresIn: process.env.REDIS_CACHE_EXPIRY as unknown as number,
};

export const authCredentials: AuthCredentialsType = {
  privateKey: process.env.JWT_SECRET,
  issuer: process.env.JWT_ISSUER,
  tokenExpiresIn: process.env.TOKEN_EXPIRY as unknown as number,
};
