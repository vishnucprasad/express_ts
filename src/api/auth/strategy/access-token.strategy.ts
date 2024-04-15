import { inject, injectable } from 'inversify';
import passport from 'passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { Payload, accessTokenConfig } from '../../../config';
import { UserRepository } from '../repository';

@injectable()
export class AccessTokenStrategy {
  constructor(
    @inject(UserRepository) private readonly userRepo: UserRepository
  ) {}

  public init() {
    passport.use(
      'access-jwt',
      new Strategy(
        {
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: accessTokenConfig.secret,
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
