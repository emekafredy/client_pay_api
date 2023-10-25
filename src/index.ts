import { AppDataSource } from './data-source';
import { PORT } from './config';
import app from './app';
import { logger } from './lib/Logger';

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT);
    logger.info(`Express server has started on port ${PORT}`);
  })
  .catch((error) => console.log(error));
