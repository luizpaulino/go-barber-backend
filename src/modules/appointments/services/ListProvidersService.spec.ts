import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ListProvidersServices from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersServices;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersServices(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const john = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: 'qwerty',
    });

    const jane = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@email.com',
      password: 'qwerty',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johntre@email.com',
      password: 'qwerty',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([john, jane]);
  });
});
