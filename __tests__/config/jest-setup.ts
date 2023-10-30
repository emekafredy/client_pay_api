import { DataSourceOptions } from 'typeorm';

import { testDBConfig } from '../../src/data-source';
import { setupPostgresContainer } from './db';

const connectionConfig: DataSourceOptions = { ...testDBConfig };

export default async () => {
  if ('username' in connectionConfig) {
    const port = connectionConfig.port || 2435;
    await setupPostgresContainer(
      connectionConfig.username as string,
      connectionConfig.password as string,
      port.toString(),
    );
  }
};
