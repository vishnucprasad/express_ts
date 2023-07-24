import 'dotenv/config';
import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Logger, serverConfig, container, serverErrorConfig } from './config';
import { DatabaseConnection } from './database';

import './auth/auth.controller';

export async function Bootstrap() {
  const database = container.get(DatabaseConnection);
  await database.initConnection();
  database.setAutoReconnect();

  const server = new InversifyExpressServer(container);
  server.setConfig(serverConfig);
  server.setErrorConfig(serverErrorConfig);

  const app = server.build();
  app.listen(3000, () =>
    new Logger().info('Server up on http://127.0.0.1:3000/')
  );
}

Bootstrap();
