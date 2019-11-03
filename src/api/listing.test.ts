import { Application } from 'express';
import { agent } from 'supertest';

// Enums.
import * as ApiConstants from './constants';

// Server.
import { Server } from '../server';

const endpoint: string = `${ApiConstants.BASE_ENDPOINT}${ApiConstants.LISTING_ENDPOINT}`;

interface IScope {
  app: Application,
}

describe(`${endpoint}`, () => {
  let scope: IScope;

  beforeEach(() => {
    scope = {
      app: new Server().app,
    };
  });

  describe(`POST ${ApiConstants.LISTING_ENDPOINT}`, () => {
    it('should return a 400 if no url is provided', async () => {
      await agent(scope.app)
        .post(`${endpoint}`)
        .expect(400);
    });

    it('should return a 400 if the url is not an Airbnb url listing', async () => {
      await agent(scope.app)
        .post(`${endpoint}`)
        .send({
          url: 'http://somewhere.someplace.not.nice',
        })
        .expect(400);
    });
  });
});
