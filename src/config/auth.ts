export default {
  jwt: {
    secret: process.env.APP_SECRET || 'default',
    expiresIn: '50d',
    //  expiresIn: '1d', -> this is what is used normally
  },
};
