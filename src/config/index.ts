require('dotenv').config();
import {
  IAuthCredentials,
  IPostgresConfig,
  IRedisConfig,
} from '../interfaces/config';

export const port = process.env.PORT || 3000;

export const postgresConfig: IPostgresConfig = {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT as unknown as number,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
};

export const redisConfig: IRedisConfig = {
  redisUrl: process.env.REDIS_URL,
  redisCacheExpiresIn: process.env.REDIS_CACHE_EXPIRY as unknown as number,
};

export const authCredentials: IAuthCredentials = {
  privateKey: process.env.JWT_SECRET,
  issuer: process.env.JWT_ISSUER,
  tokenExpiresIn: process.env.TOKEN_EXPIRY as unknown as number,
};
