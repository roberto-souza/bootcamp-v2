import ISendMailDTO from '../dtos/ISendMailDTO';

export default interface IMailProvder {
  sendMail(data: ISendMailDTO): Promise<void>;
}
