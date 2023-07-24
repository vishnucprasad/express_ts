import { Container } from 'inversify';
import { RefreshTokenRepository, UserRepository } from '../auth/repository';
import { AuthService } from '../auth/auth.service';
import { Logger } from '.';
import { DatabaseConnection } from '../database';
import { RefreshTokenModel, UserModel } from '../auth/schema';
import { AccessTokenStrategy } from '../auth/strategy';

export const container = new Container();

container.bind(UserRepository).toSelf();
container.bind(RefreshTokenRepository).toSelf();
container.bind(AuthService).toSelf();
container.bind(Logger).toSelf();
container.bind(DatabaseConnection).toSelf();
container.bind(AccessTokenStrategy).toSelf();
container.bind(UserModel).toConstantValue(UserModel.getModel());
container.bind(RefreshTokenModel).toConstantValue(RefreshTokenModel.getModel());
