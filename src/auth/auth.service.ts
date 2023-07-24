import { inject, injectable } from 'inversify';
import { RegisterDto, SigninDto } from './dto';
import { RefreshTokenRepository, UserRepository } from './repository';
import * as argon from 'argon2';
import jwt from 'jsonwebtoken';
import {
  JwtConfig,
  NotFoundException,
  Payload,
  UnauthorizedException,
  accessTokenConfig,
  refreshTokenConfig,
} from '../config';
import { IRefreshToken } from './schema';

@injectable()
export class AuthService {
  constructor(
    @inject(UserRepository) private readonly userRepo: UserRepository,
    @inject(RefreshTokenRepository)
    private readonly refreshTokenRepo: RefreshTokenRepository
  ) {}

  async register(dto: RegisterDto) {
    dto.password = await argon.hash(dto.password);
    return await this.userRepo.createUser(dto);
  }

  async signin(dto: SigninDto): Promise<{
    access_token: string;
    refresh_token: string;
  }> {
    const user = await this.userRepo.findUserByEmail(dto.email);

    if (!user) throw new NotFoundException('User not found');

    const checkPassword = await argon.verify(user.password, dto.password);

    if (!checkPassword) throw new UnauthorizedException('Invalid password');

    const payload: Payload = {
      sub: user._id,
      email: user.email,
    };

    const accessToken = this.generateJWT(payload, accessTokenConfig);
    const refreshToken = this.generateJWT(payload, refreshTokenConfig);

    const doc = await this.refreshTokenRepo.findByUserId(user._id);

    if (doc) {
      await this.refreshTokenRepo.findByIdAndUpdate(doc._id, {
        token: refreshToken,
      } as Partial<IRefreshToken>);

      return {
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    }

    await this.refreshTokenRepo.create({
      user: user._id,
      token: refreshToken,
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  generateJWT(payload: Payload, config: JwtConfig) {
    return jwt.sign(payload, config.secret, {
      expiresIn: config.expiresIn,
    });
  }
}
