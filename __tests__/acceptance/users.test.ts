import request from 'supertest';
import { AppDataSource } from '../../src/data-source';
import app from '../../src/app';
import { PORT } from '../../src/config';

let connection, server;

const testUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'jonh.doe@mail.com',
  image_url: 'www.image.com',
};

beforeEach(async () => {
  connection = await AppDataSource.initialize();
  await connection.synchronize(true);
  server = app.listen(PORT);
});

afterEach(() => {
  connection.close();
  server.close();
});

it('gets all users', async () => {
  const response = await request(app).get('/api/users');
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual([]);
});

it('creates a user', async () => {
  const response = await request(app).post('/api/users').send(testUser);
  expect(response.statusCode).toBe(200);

  const { id, email } = response.body;
  expect(id).toEqual(1);
  expect(email).toEqual(testUser.email);
});

it('should not create a user if required data is missing', async () => {
  const response = await request(app)
    .post('/api/users')
    .send({ ...testUser, firstName: '' });
  expect(response.statusCode).toBe(400);

  const { errors } = response.body;
  expect(errors).not.toBeNull();
  expect(errors.length).toBe(1);
  expect(errors[0].message).toEqual('"firstName" is not allowed to be empty');
});
