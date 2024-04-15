import { json, urlencoded } from 'body-parser';
import { Application, NextFunction, Request, Response } from 'express';
import { BaseException, InternalServerException } from './exception.config';
import passport from 'passport';
import { DatabaseConnection } from '../database';
import {
  AccessTokenStrategy,
  RefreshTokenStrategy,
} from '../api/auth/strategy';
import { container } from './inversify.config';

export async function serverConfig(app: Application) {
  app.use(
    urlencoded({
      extended: true,
    })
  );
  app.use(json());

  app.use(passport.initialize());
  const accessTokenStrategy = container.get(AccessTokenStrategy);
  accessTokenStrategy.init();
  const refreshTokenStrategy = container.get(RefreshTokenStrategy);
  refreshTokenStrategy.init();

  const database = container.get(DatabaseConnection);
  await database.initConnection();
  database.setAutoReconnect();
}

export function serverErrorConfig(app: Application) {
  app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    if (err && err instanceof BaseException) {
      return res.status(err.statusCode).json(err);
    }

    if (err) {
      return res.status(500).json(new InternalServerException(err.message));
    }

    next();
  });
}
