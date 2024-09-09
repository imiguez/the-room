export default () => {
  const config = {
    port: parseInt(process.env.PORT, 10) || 3000,
    baseURL: process.env.DEV_BASE_URL,
    database: {
      url: process.env.DEV_MONGO_URL,
    },
    // Adding Google OAuth credentials.
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    // Adding Redis configurations.
    redis: {
      port: process.env.REDIS_PORT || 6379,
      host: process.env.REDIS_HOST,
    },
    // Adding Express-Session configurations.
    expressSession: {
      secret: process.env.EXPRESS_SESSION_SECRET,
    },
  };

  if (process.env.NODE_ENV == 'prod') {
    config.baseURL = process.env.PROD_BASE_URL;
    config.database.url = process.env.PROD_MONGO_URL;
  }

  return config;
};
