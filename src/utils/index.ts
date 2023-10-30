import { EntityTarget, Repository } from 'typeorm';
import { AppDataSource, TestAppDataSource } from '../data-source';
import { generateJWTToken, verifyJWTToken } from './jwt';
import { nodeEnv } from '../config';

const handleGetRepository = <T>(entity: EntityTarget<T>): Repository<T> => {
  return nodeEnv === 'test'
    ? TestAppDataSource.getRepository(entity)
    : AppDataSource.getRepository(entity);
};

export { generateJWTToken, verifyJWTToken, handleGetRepository };
