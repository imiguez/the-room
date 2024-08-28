export default () => {
  let config;
  switch (process.env.NODE_ENV) {
    case 'prod':
      config = {
        port: parseInt(process.env.PROD_NEST_PORT, 10) || 3000,
        baseURL: process.env.PROD_BASE_URL,
        database: {
          url: process.env.PROD_MONGO_URL,
        },
        redis: {
          host: process.env.REDIS_HOST || 'redis-sessions',
        },
      };
      break;
    case 'docker':
      config = {
        port: parseInt(process.env.DOCKER_NEST_PORT, 10) || 3000,
        baseURL: process.env.DOCKER_BASE_URL,
        database: {
          url: process.env.DOCKER_MONGO_URL,
        },
        redis: {
          host: process.env.DOCKER_REDIS_HOST || 'redis-sessions',
        },
      };
      break;
    default:
      config = {
        port: parseInt(process.env.DEV_NEST_PORT, 10) || 3000,
        baseURL: process.env.DEV_BASE_URL,
        database: {
          url: process.env.DEV_MONGO_URL,
        },
        redis: {
          host: process.env.REDIS_HOST || 'redis-sessions',
        },
      };
      break;
  }
  // Adding Google OAuth credentials.
  config.google = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  };
  // Adding Redis configurations.
  config.redis.port = process.env.REDIS_PORT || 6379;
  // Adding Express-Session configurations.
  config.expressSession = {
    secret: process.env.EXPRESS_SESSION_SECRET,
  };
  return config;
};
