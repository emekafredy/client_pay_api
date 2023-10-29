export interface IPostgresConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface IRedisConfig {
  redisUrl: string;
  redisCacheExpiresIn: number;
}

export interface IAuthCredentials {
  privateKey: string;
  issuer: string;
  tokenExpiresIn: number;
}
