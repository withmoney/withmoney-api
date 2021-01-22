const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: process.env.DEPLOY_NAME,
      script: 'npm run start',
      env: {
        COMMON_VARIABLE: 'true',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: process.env.DEPLOY_USER,
      host: process.env.DEPLOY_HOST,
      ref: 'origin/master',
      repo: 'git@github.com:withmoney/withmoney-api.git',
      path: process.env.DEPLOY_PATH,
      'post-deploy': [
        'yarn',
        'npm -s run generate',
        'yarn migrate:up',
        'yarn build:prod',
        `pm2 reload ecosystem.config.js --env production --name ${process.env.DEPLOY_NAME}`,
      ].join(' && '),
    },
  },
};
