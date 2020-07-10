import AppError from '@shared/errors/AppErrors';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
  });

  it('should be able to create a new user', async () => {
    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Roberto Souza',
      email: 'contato@robertosouza.com.br',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'Roberto Souza',
      email: 'contato@robertosouza.com.br',
      password: '123123',
    });

    await expect(
      createUser.execute({
        name: 'Roberto Souza',
        email: 'contato@robertosouza.com.br',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
