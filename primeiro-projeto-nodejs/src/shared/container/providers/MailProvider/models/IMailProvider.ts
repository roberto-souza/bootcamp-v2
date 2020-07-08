export default interface IMailProvder {
  sendMail(to: string, body: string): Promise<void>;
}
