export default {
  jwt: {
    secrets: process.env.APP_SECRET,
    expiresIn: '1d',
  },
};
