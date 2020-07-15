import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUserRepository: FakeUserRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    listProviders = new ListProvidersService(fakeUserRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'Roberto 1',
      email: 'contato1@roberto.com.br',
      password: '123123',
    });

    const user2 = await fakeUserRepository.create({
      name: 'Roberto 2',
      email: 'contato2@roberto.com.br',
      password: '123123',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'Roberto 3',
      email: 'contato3@roberto.com.br',
      password: '123123',
    });

    const providers = await listProviders.execute(loggedUser.id);

    expect(providers).toEqual([user1, user2]);
  });
});
