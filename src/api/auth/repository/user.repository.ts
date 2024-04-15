import { inject, injectable } from 'inversify';
import { IUser, IUserDoc, UserModel, UserSchema } from '../schema';
import { Model } from 'mongoose';
import { ForbiddenException } from '../../../config';

@injectable()
export class UserRepository {
  constructor(
    @inject(UserModel)
    private readonly userModel: Model<UserSchema>
  ) {}

  async createUser(user: IUser): Promise<IUserDoc> {
    try {
      return await new this.userModel(user).save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ForbiddenException(`Email ${user.email} is already in use`);
      }

      throw error;
    }
  }

  async findById(id: string): Promise<IUserDoc> {
    return await this.userModel.findById(id);
  }

  async findUserByEmail(email: string): Promise<IUserDoc> {
    return await this.userModel.findOne({ email });
  }
}
