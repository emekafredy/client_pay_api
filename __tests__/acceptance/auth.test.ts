import request from 'supertest';
import { DataSource } from 'typeorm';
import app from '../../src/app';
import { port } from '../../src/config';
import { closeInstance } from '../../src/lib/redis';
import { initializeDataSource } from '../config/init-data-source';

let dataSource: DataSource, server;

const validInput = {
  firstName: 'John',
  lastName: 'Doe',
  password: '123456',
  email: 'jonh.doe@mail.com',
  user_type: 'employer',
  image_url: 'www.image.com',
};

describe('Authentication routes', () => {
  beforeAll(async () => {
    dataSource = await initializeDataSource();
    server = app.listen(port);

    return dataSource;
  });

  afterAll(() => {
    dataSource.destroy();
    server.close();
    closeInstance();
  });

  test('successful registeration for new user with valid input', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send(validInput);

    const { firstName, lastName } = response.body.user;

    expect(response.statusCode).toBe(200);
    expect(firstName).toEqual(validInput.firstName);
    expect(lastName).toEqual(validInput.lastName);
  });

  test('error in registeration for new user with invalid input', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({ ...validInput, firstName: '' });

    const { errors } = response.body;

    expect(response.statusCode).toBe(400);
    expect(errors[0].message).toEqual('"firstName" is not allowed to be empty');
  });
});
