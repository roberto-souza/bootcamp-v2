import { uuid } from 'uuidv4';

import UserTokens from '@modules/users/infra/typeorm/entities/UserToken';
import IUserTokensRepository from '../IUserTokensRepository';

class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserTokens[] = [];

  public async generate(userId: string): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, { id: uuid(), token: uuid(), userId });

    this.userTokens.push(userToken);

    return userToken;
  }
}

export default FakeUserTokensRepository;
