import { Application } from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, createConnection } from 'mongoose';
import { agent, Response } from 'supertest';

// Config.
import * as dbConfig from '../config/db';

// Enums.
import * as ApiConstants from './constants';

// Modules.
import * as db from '../modules/db';

// Server.
import { Server } from '../server';

jest.mock('../modules/db/connect');

const endpoint: string = `${ApiConstants.BASE_ENDPOINT}${ApiConstants.LISTING_ENDPOINT}`;

interface IScope {
  app: Application;
}

describe(`${endpoint}`, () => {
  let mongod: MongoMemoryServer;
  let scope: IScope;

  beforeAll(async () => {
    let connection: Connection;
    let uri: string;

    mongod = new MongoMemoryServer();
    uri = await mongod.getConnectionString();
    connection = createConnection(uri, dbConfig.defaultConnectionOptions);

    // Mock the wrapped connection.
    (db.connect as jest.Mock).mockReturnValue(connection);
  });

  afterAll(async () => {
    await mongod.stop();
  });

  beforeEach(() => {
    scope = {
      app: new Server().app,
    };
  });

  describe(`POST ${ApiConstants.LISTING_ENDPOINT}`, () => {
    it('should return a 400 if no url is provided', async () => {
      const response: Response = await agent(scope.app)
        .post(`${endpoint}`)
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });

    it('should return a 400 if the url is not an Airbnb url listing', async () => {
      const response: Response = await agent(scope.app)
        .post(`${endpoint}`)
        .send({
          url: 'http://somewhere.someplace.not.nice',
        })
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });

    it('should return a 400 if the url has no listing id', async () => {
      const response: Response = await agent(scope.app)
        .post(`${endpoint}`)
        .send({
          url: 'https://airbnb.co.uk/rooms/',
        })
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });
});
