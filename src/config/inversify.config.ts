import { Container } from 'inversify';

import '../api/common/common.controller';

export const container = new Container({ autoBindInjectable: true });
