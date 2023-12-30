import { TestFactory } from '../helpers/factory';

const validInput = {
  firstName: 'John',
  lastName: 'Doe',
  password: '123456',
  email: 'jonh.doe@mail.com',
  user_type: 'employer',
  image_url: 'www.image.com',
};

describe('Authentication routes', () => {
  const factory: TestFactory = new TestFactory();

  beforeEach((done) => {
    factory.init().then(done);
  });

  afterEach((done) => {
    factory.close().then(done);
  });

  afterAll((done) => {
    factory.closeRedisServer().then(done);
  });

  it('successfully registers new user with valid input', async () => {
    const response = await factory.app
      .post('/api/auth/signup')
      .send(validInput);

    const { firstName, lastName } = response.body.user;

    expect(response.statusCode).toBe(201);
    expect(firstName).toEqual(validInput.firstName);
    expect(lastName).toEqual(validInput.lastName);
  });

  it('throws error for new user with missing firstName', async () => {
    const response = await factory.app
      .post('/api/auth/signup')
      .send({ ...validInput, firstName: '' });

    const { errors } = response.body;

    expect(response.statusCode).toBe(400);
    expect(errors[0].message).toEqual('"firstName" is not allowed to be empty');
  });

  it('throws error for new user with missing lastName', async () => {
    const response = await factory.app
      .post('/api/auth/signup')
      .send({ ...validInput, lastName: '' });

    const { errors } = response.body;

    expect(response.statusCode).toBe(400);
    expect(errors[0].message).toEqual('"lastName" is not allowed to be empty');
  });

  it('throws error for new user with missing email', async () => {
    const response = await factory.app
      .post('/api/auth/signup')
      .send({ ...validInput, email: '' });

    const { errors } = response.body;

    expect(response.statusCode).toBe(400);
    expect(errors[0].message).toEqual('"email" is not allowed to be empty');
  });

  it('throws error for new user with invalid email input', async () => {
    const response = await factory.app
      .post('/api/auth/signup')
      .send({ ...validInput, email: 'john.doe@' });

    const { errors } = response.body;

    expect(response.statusCode).toBe(400);
    expect(errors[0].message).toEqual('"email" must be a valid email');
  });

  it('throws error for new user with missing password', async () => {
    const response = await factory.app
      .post('/api/auth/signup')
      .send({ ...validInput, password: '' });

    const { errors } = response.body;

    expect(response.statusCode).toBe(400);
    expect(errors[0].message).toEqual('"password" is not allowed to be empty');
  });
});
