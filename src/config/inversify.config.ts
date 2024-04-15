import { Container } from 'inversify';
import { RefreshTokenModel, UserModel } from '../api/auth/schema';

import '../api/common/common.controller';
import '../api/auth/auth.controller';

export const container = new Container({ autoBindInjectable: true });

container.bind(UserModel).toConstantValue(UserModel.getModel());
container.bind(RefreshTokenModel).toConstantValue(RefreshTokenModel.getModel());
