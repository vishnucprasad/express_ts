import { inject, injectable } from 'inversify';
import {
  IRefreshToken,
  IRefreshTokenDoc,
  RefreshTokenModel,
  RefreshTokenSchema,
} from '../schema';
import { Model } from 'mongoose';
import { ForbiddenException } from '../../../config';

@injectable()
export class RefreshTokenRepository {
  constructor(
    @inject(RefreshTokenModel)
    private readonly refreshTokenModel: Model<RefreshTokenSchema>
  ) {}

  async create(refreshToken: IRefreshToken): Promise<void> {
    try {
      const newRefreshToken = new this.refreshTokenModel(refreshToken);
      await newRefreshToken.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ForbiddenException(
          'A refresh token already exists for this user'
        );
      }

      throw error;
    }
  }

  async findByUserId(userId: string): Promise<IRefreshTokenDoc> {
    return await this.refreshTokenModel.findOne({
      user: userId,
    });
  }

  async findByToken(token: string): Promise<IRefreshTokenDoc> {
    return await this.refreshTokenModel.findOne({ token });
  }

  async findByIdAndUpdate(
    userId: string,
    patch: Partial<IRefreshToken>
  ): Promise<void> {
    await this.refreshTokenModel.findByIdAndUpdate(userId, patch);
  }

  async findByUserIdAndDelete(userId: string): Promise<void> {
    await this.refreshTokenModel.findOneAndDelete({ user: userId });
  }
}
