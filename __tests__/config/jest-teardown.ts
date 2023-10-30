import { removePostgresContainer } from './db';

export default async () => {
  await removePostgresContainer();
};
