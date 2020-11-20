import YAML from 'yamljs';
import { authentication } from '../middleware/auth';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import routes from '../routes';
import Db from '../database';

require('dotenv').config();

const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = YAML.load('docs/swagger.yaml');

export async function createApp() {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  app.use(helmet());

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  //   app.use('/api/auth/*');
  app.use('/api', authentication, routes);

  app.use('*', (req, res) => {
    res.status(404);
    // respond with json
    return res.send({
      status: 404,
      message: 'Page Not Found',
      docs: '/api-docs/',
    });
  });

  return app;
}
