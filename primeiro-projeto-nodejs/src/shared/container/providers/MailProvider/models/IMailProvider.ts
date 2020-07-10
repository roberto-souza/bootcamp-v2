import ISendMailDTO from '../ISendMailDTO';

export default interface IMailProvder {
  sendMail(data: ISendMailDTO): Promise<void>;
}
