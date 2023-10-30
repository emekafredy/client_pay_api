import { TestAppDataSource, testDBConfig } from '../../src/data-source';
import { DataSource } from 'typeorm';
import { Container } from 'typedi';
import { createDatabase } from 'typeorm-extension';

const initializeDataSource = async (): Promise<DataSource> => {
  const dataSource = TestAppDataSource;
  await createDatabase({
    options: testDBConfig,
  });

  await dataSource
    .initialize()
    .then(async () => dataSource.synchronize(false))
    .then(() => Container.set(DataSource, dataSource));

  return dataSource;
};

export { TestAppDataSource, initializeDataSource };
