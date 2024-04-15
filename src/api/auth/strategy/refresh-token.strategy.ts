import { inject, injectable } from 'inversify';
import passport from 'passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { Payload, refreshTokenConfig } from '../../../config';
import { UserRepository } from '../repository';

@injectable()
export class RefreshTokenStrategy {
  constructor(
    @inject(UserRepository) private readonly userRepo: UserRepository
  ) {}

  public init() {
    passport.use(
      'refresh-jwt',
      new Strategy(
        {
          jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
          secretOrKey: refreshTokenConfig.secret,
        },
        async (payload: Payload, done: VerifiedCallback) => {
          const user = await this.userRepo.findById(payload.sub);

          if (!user) {
            return done(null, false);
          }

          return done(null, user);
        }
      )
    );
  }
}
