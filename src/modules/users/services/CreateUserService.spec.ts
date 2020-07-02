import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/Hashprovider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: 'qwerty',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two users with the same e-mail', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: 'qwerty',
    });

    expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: 'qwerty',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
