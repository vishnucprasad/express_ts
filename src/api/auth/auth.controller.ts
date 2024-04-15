import {
  BaseHttpController,
  controller,
  httpDelete,
  httpGet,
  httpPost,
  request,
  requestBody,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { RegisterDto, SigninDto } from './dto';
import { validateBody } from '../../middleware';
import { AuthService } from './auth.service';
import passport from 'passport';
import { Request } from 'express';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { IUserDoc } from './schema';

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

  @httpGet('/', passport.authenticate('access-jwt', { session: false }))
  getUser(@request() req: Request) {
    return req.user;
  }

  @httpPost(
    '/refresh',
    validateBody(RefreshTokenDto),
    passport.authenticate('refresh-jwt', { session: false })
  )
  refreshToken(@requestBody() dto: RefreshTokenDto, @request() req: Request) {
    return this.authService.refreshToken(dto, req.user as IUserDoc);
  }

  @httpDelete(
    '/signout',
    passport.authenticate('access-jwt', { session: false })
  )
  signout(@request() req: Request) {
    return this.authService.signout((req.user as IUserDoc)._id);
  }
}
