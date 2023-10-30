import express from 'express';
import supertest from 'supertest';
import { DataSource } from 'typeorm';

import { Server } from 'node:http';

import app from '../../src/app';
import { initializeDataSource } from '../config/init-data-source';
import { closeInstance } from '../../src/lib/redis';
import { logger } from '../../src/lib/Logger';

export class TestFactory {
  private _app: express.Application;
  private _dataSource: DataSource;
  private _server: Server;

  public get app(): supertest.SuperTest<supertest.Test> {
    return supertest(app);
  }

  public async init(): Promise<void> {
    await this.startup();
  }

  public async close(): Promise<void> {
    this._server.close();
    await this._dataSource.destroy();
  }

  public async closeRedisServer(): Promise<void> {
    await closeInstance();
  }

  private async startup(): Promise<void> {
    try {
      this._dataSource = await initializeDataSource();
      this._app = app;
      this._server = this._app.listen(3002);
    } catch (error) {
      logger.error(`Test failed: ${error}`);
    }
  }
}
