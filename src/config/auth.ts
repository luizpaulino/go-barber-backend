export default {
  jwt: {
    secrets: process.env.APP_SECRET || 'default',
    expiresIn: '1d',
  },
};
