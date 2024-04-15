import { InversifyExpressServer } from 'inversify-express-utils';
import { Application } from 'express';
import request from 'supertest';
import { connection } from 'mongoose';
import { container, serverConfig, serverErrorConfig } from '../src/config';

import '../src/api/common/common.controller';

let app: Application;
let testServer: any;

beforeAll(async () => {
  const server = new InversifyExpressServer(container);
  server.setConfig(serverConfig);
  server.setErrorConfig(serverErrorConfig);

  app = server.build();
  testServer = app.listen(3001);
});

afterAll(() => {
  connection.collection('users').deleteMany();
  connection.collection('refreshtokens').deleteMany();

  if (testServer) {
    testServer.close();
  }
});

describe('GET /', () => {
  it('should retrun a greetings message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body['message']).toBe('Express TS');
  });
});

describe('NOT_FOUND', () => {
  it('should return a not found message', async () => {
    const response = await request(app).get('/unknown');
    expect(response.status).toBe(404);
  });
});
