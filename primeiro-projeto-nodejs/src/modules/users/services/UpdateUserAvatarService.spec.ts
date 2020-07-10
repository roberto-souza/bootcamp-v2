import AppError from '@shared/errors/AppErrors';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUserRepository: FakeUserRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );
  });

  it('should be able update user avatar', async () => {
    const user = await fakeUserRepository.create({
      name: 'Roberto',
      email: 'contato@roberto.com.br',
      password: '123123',
    });

    await updateUserAvatar.execute({
      userId: user.id,
      avatarFilename: 'avatar.png',
    });

    expect(user.avatar).toBe('avatar.png');
  });

  it('should not be able update avatar from non existing user', async () => {
    await expect(
      updateUserAvatar.execute({
        userId: 'non-existing',
        avatarFilename: 'avatar.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUserRepository.create({
      name: 'Roberto',
      email: 'contato@roberto.com.br',
      password: '123123',
    });

    await updateUserAvatar.execute({
      userId: user.id,
      avatarFilename: 'avatar.png',
    });

    await updateUserAvatar.execute({
      userId: user.id,
      avatarFilename: 'avatar2.png',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.png');
    expect(user.avatar).toBe('avatar2.png');
  });
});
