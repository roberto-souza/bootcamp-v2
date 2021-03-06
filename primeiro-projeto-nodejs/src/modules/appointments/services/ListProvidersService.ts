import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(userId: string): Promise<User[]> {
    // let users = await this.cacheProvider.recover<User[]>(
    //   `providers-list:${userId}`,
    // );

    let users;

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        exceptUserId: userId,
      });

      this.cacheProvider.save(`providers-list:${userId}`, classToClass(users));
    }

    return users;
  }
}

export default ListProvidersService;
