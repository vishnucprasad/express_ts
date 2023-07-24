import {
  BaseHttpController,
  controller,
  httpPost,
  requestBody,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { RegisterDto, SigninDto } from './dto';
import { validateBody } from '../middleware';
import { AuthService } from './auth.service';

@controller('/auth')
export class AuthController extends BaseHttpController {
  constructor(@inject(AuthService) private readonly authService: AuthService) {
    super();
  }

  @httpPost('/register', validateBody(RegisterDto))
  register(@requestBody() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @httpPost('/signin', validateBody(SigninDto))
  signin(@requestBody() dto: SigninDto) {
    return this.authService.signin(dto);
  }
}
