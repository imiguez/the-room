export default () => {
  let config;
  switch (process.env.NODE_ENV) {
    case 'prod':
      config = {
        port: parseInt(process.env.PROD_NEST_PORT, 10) || 3000,
        database: {
          host: process.env.MONGOHOST,
          port: process.env.PROD_MONGOPORT,
          pass: process.env.PROD_MONGOPASSWORD,
          user: process.env.PROD_MONGOUSER,
          url: process.env.PROD_MONGO_URL,
        },
      };
      break;
    case 'docker':
      config = {
        port: parseInt(process.env.DOCKER_NEST_PORT, 10) || 3000,
        database: {
          host: process.env.MONGOHOST,
          port: process.env.DOCKER_MONGOPORT,
          pass: process.env.DOCKER_MONGOPASSWORD,
          user: process.env.DOCKER_MONGOUSER,
          url: process.env.DOCKER_MONGO_URL,
        },
      };
      break;
    default:
      config = {
        port: parseInt(process.env.DEV_NEST_PORT, 10) || 3000,
        database: {
          host: process.env.MONGOHOST,
          port: process.env.DEV_MONGOPORT,
          pass: process.env.DEV_MONGOPASSWORD,
          user: process.env.DEV_MONGOUSER,
          url: process.env.DEV_MONGO_URL,
        },
      };
      break;
  }
  return config;
};
