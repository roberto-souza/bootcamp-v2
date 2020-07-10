import IMailProvder from '../models/IMailProvider';
import ISendMailDTO from '../ISendMailDTO';

class FakeMailProvider implements IMailProvder {
  private messages: ISendMailDTO[] = [];

  public async sendMail(message: ISendMailDTO): Promise<void> {
    this.messages.push(message);
  }
}

export default FakeMailProvider;
