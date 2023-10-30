/* eslint-disable  @typescript-eslint/no-explicit-any */
import Docker from 'dockerode';

import { containerExec, imageExists, pullImageAsync } from 'dockerode-utils';

export { containerExec } from 'dockerode-utils';

const IMAGE = 'postgres:14-alpine';
const NAME = 'pg-test';

export const removePostgresContainer = async (): Promise<void> => {
  const docker = new Docker();
  try {
    const container = await docker.getContainer(NAME);
    try {
      await container.stop();
    } catch (error: any) {
      if (error.statusCode !== 304) throw error;
    }
    await container.remove({ v: true });
  } catch (error: any) {
    if (error.statusCode !== 404) throw error;
  }
};

const ensurePgServiceReadiness = async (
  container: Docker.Container,
  username: string,
) => {
  await containerExec(container, [
    'bash',
    '-c',
    `until psql -U ${username} -c "SELECT 1" > /dev/null 2>&1 ; do echo "waiting pg service to be ready"; sleep 1; done`,
  ]);
};

export const setupPostgresContainer = async (
  username: string,
  password: string,
  port: string,
) => {
  const docker = new Docker();
  const needsToPull = !(await imageExists(docker, IMAGE));

  if (needsToPull) await pullImageAsync(docker, IMAGE);

  await removePostgresContainer();

  const container = await docker.createContainer({
    Env: [
      `POSTGRES_PASSWORD=${password}`,
      `POSTGRES_USER=${username}`,
      'NODE_ENV=test',
    ],
    HostConfig: {
      PortBindings: {
        '5432/tcp': [
          {
            HostPort: port,
          },
        ],
      },
    },
    ExposedPorts: { '5432/tcp': {} },
    Image: IMAGE,
    name: NAME,
  });
  await container.start();

  await ensurePgServiceReadiness(container, username);
  return container;
};
