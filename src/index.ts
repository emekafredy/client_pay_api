import { AppDataSource } from './data-source';
import { port } from './config';
import app from './app';
import { logger } from './lib/Logger';
import { handleError } from './lib/errors/globalErrorHandler';
import { BaseError } from './lib/errors/BaseError';

AppDataSource.initialize()
  .then(async () => {
    app.listen(port);
    logger.info(`Express server has started on port ${port}`);
  })
  .catch((error) => logger.error(`Initialization error: ${error}`));

process.on('uncaughtException', async (error: Error) => {
  await handleError(error);
  if (!(error instanceof BaseError)) process.exit(1);
});

process.on('unhandledRejection', (reason: Error) => {
  throw reason;
});
