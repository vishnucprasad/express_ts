import { InversifyExpressServer } from 'inversify-express-utils';
import { Application } from 'express';
import request from 'supertest';
import { connection } from 'mongoose';
import { container, serverConfig, serverErrorConfig } from '../src/config';
import { RegisterDto, SigninDto } from '../src/auth/dto';

import '../src/auth/auth.controller';

let app: Application;
let testServer: any;
const store: Record<string, string> = {};

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

describe('POST /auth/register', () => {
  it('should throw an error if body not provided ', async () => {
    const response = await request(app).post('/auth/register');
    expect(response.status).toBe(400);
    expect(response.body['type']).toBe('Validation Error');
  });

  it('should throw an error if name is empty', async () => {
    const dto: Omit<RegisterDto, 'name'> = {
      email: 'johndoe@example.com',
      password: 'JohnDoe@123',
    };

    const response = await request(app).post('/auth/register').send(dto);
    expect(response.status).toBe(400);
    expect(response.body['type']).toBe('Validation Error');
  });

  it('should throw an error if email is empty', async () => {
    const dto: Omit<RegisterDto, 'email'> = {
      name: 'John Doe',
      password: 'JohnDoe@123',
    };

    const response = await request(app).post('/auth/register').send(dto);
    expect(response.status).toBe(400);
    expect(response.body['type']).toBe('Validation Error');
  });

  it('should throw an error if password is empty', async () => {
    const dto: Omit<RegisterDto, 'password'> = {
      name: 'John Doe',
      email: 'johndoe@example.com',
    };

    const response = await request(app).post('/auth/register').send(dto);
    expect(response.status).toBe(400);
    expect(response.body['type']).toBe('Validation Error');
  });

  it('should throw an error if password is not strong enough', async () => {
    const dto: RegisterDto = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345',
    };

    const response = await request(app).post('/auth/register').send(dto);
    expect(response.status).toBe(400);
    expect(response.body['type']).toBe('Validation Error');
  });

  it('should register user', async () => {
    const dto: RegisterDto = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'JohnDoe@123',
    };

    const response = await request(app).post('/auth/register').send(dto);
    expect(response.status).toBe(200);
    const body = JSON.stringify(response.body);
    expect(body).toContain(dto.name);
    expect(body).toContain(dto.email);
  });
});

describe('POST /auth/signin', () => {
  it('should throw an error if body not provided ', async () => {
    const response = await request(app).post('/auth/signin');
    expect(response.status).toBe(400);
    expect(response.body['type']).toBe('Validation Error');
  });

  it('should throw an error if email is empty', async () => {
    const dto: Omit<SigninDto, 'email'> = {
      password: 'JohnDoe@123',
    };

    const response = await request(app).post('/auth/signin').send(dto);
    expect(response.status).toBe(400);
    expect(response.body['type']).toBe('Validation Error');
  });

  it('should throw an error if password is empty', async () => {
    const dto: Omit<SigninDto, 'password'> = {
      email: 'johndoe@example.com',
    };

    const response = await request(app).post('/auth/signin').send(dto);
    expect(response.status).toBe(400);
    expect(response.body['type']).toBe('Validation Error');
  });

  it('should throw an error if email is invalid', async () => {
    const dto: SigninDto = {
      email: 'invaliduser@invalid.com',
      password: 'JohnDoe@123',
    };

    const response = await request(app).post('/auth/signin').send(dto);
    expect(response.status).toBe(404);
    expect(response.body['type']).toBe('Not found');
  });

  it('should throw an error if password is invalid', async () => {
    const dto: SigninDto = {
      email: 'johndoe@example.com',
      password: 'invalid',
    };

    const response = await request(app).post('/auth/signin').send(dto);
    expect(response.status).toBe(401);
    expect(response.body['type']).toBe('Unauthorized');
  });

  it('should signin user', async () => {
    const dto: SigninDto = {
      email: 'johndoe@example.com',
      password: 'JohnDoe@123',
    };

    const response = await request(app).post('/auth/signin').send(dto);
    expect(response.status).toBe(200);
    store['access_token'] = response.body['access_token'];
  });
});
