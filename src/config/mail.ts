interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'luizpaulino@dev42.tech',
      name: 'Luiz Paulino | O Dev 42',
    },
  },
} as IMailConfig;
