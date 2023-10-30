import { createClient } from 'redis';
import { logger } from './Logger';
import { redisConfig } from '../config';

const redisClient = createClient({
  url: redisConfig.redisUrl,
});

const connectRedis = async () => {
  try {
    redisClient.on('error', (error) => logger.error(`Error : ${error}`));
    await redisClient.connect();

    logger.info('Redis client connected');
  } catch (error) {
    logger.error(`Error ${error}`);
    setTimeout(connectRedis, 5000);
  }
};

connectRedis();

export const closeInstance = () => {
  redisClient.quit();
};

export default redisClient;
