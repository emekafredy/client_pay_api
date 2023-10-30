export type PostgresConfigType = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};

export type RedisConfigType = {
  redisUrl: string;
  redisCacheExpiresIn: number;
};

export type AuthCredentialsType = {
  privateKey: string;
  issuer: string;
  tokenExpiresIn: number;
};
