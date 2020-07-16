interface IMailConfig {
  driver: 'ethereal' | 'ses';
  // precisa ser um e-mail válido para enviar pelo SES
  defaults: {
    from: {
      name: string;
      email: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      name: 'Roberto',
      email: 'vidadegaragem@gmail.com',
    },
  },
} as IMailConfig;
