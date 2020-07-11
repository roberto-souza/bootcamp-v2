import AppError from '@shared/errors/AppErrors';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able update user', async () => {
    const user = await fakeUserRepository.create({
      name: 'Roberto',
      email: 'contato@roberto.com.br',
      password: '123123',
    });

    const updatedUser = await updateProfile.execute({
      userId: user.id,
      name: 'Souza',
      email: 'contato@souza.com.br',
    });

    expect(updatedUser.name).toBe('Souza');
    expect(updatedUser.email).toBe('contato@souza.com.br');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUserRepository.create({
      name: 'Roberto',
      email: 'contato@roberto.com.br',
      password: '123123',
    });

    const user = await fakeUserRepository.create({
      name: 'Teste',
      email: 'teste@roberto.com.br',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        userId: user.id,
        name: 'Teste',
        email: 'contato@roberto.com.br',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able update the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Roberto',
      email: 'contato@roberto.com.br',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      userId: user.id,
      name: 'Souza',
      email: 'contato@souza.com.br',
      oldPassword: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able update the password without old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Roberto',
      email: 'contato@roberto.com.br',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        userId: user.id,
        name: 'Souza',
        email: 'contato@souza.com.br',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able update the password with wrong old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Roberto',
      email: 'contato@roberto.com.br',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        userId: user.id,
        name: 'Souza',
        email: 'contato@souza.com.br',
        oldPassword: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
