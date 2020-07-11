import AppError from '@shared/errors/AppErrors';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUserRepository: FakeUserRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    showProfile = new ShowProfileService(fakeUserRepository);
  });

  it('should be able show the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'Roberto',
      email: 'contato@roberto.com.br',
      password: '123123',
    });

    const profile = await showProfile.execute(user.id);

    expect(profile.name).toBe('Roberto');
    expect(profile.email).toBe('contato@roberto.com.br');
  });

  it('should not be able show the profile if not exists', async () => {
    await expect(
      showProfile.execute('user-non-existing'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
