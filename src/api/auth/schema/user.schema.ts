import { Prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
import { Document, Model, SchemaOptions } from 'mongoose';
import { BaseSchema } from '../../../database/schema';

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserDoc extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
}

const schemaOptions: SchemaOptions = {
  collection: 'users',
  versionKey: false,
  toJSON: {
    transform: (_doc, ret) => {
      delete ret.password;
    },
  },
};

@modelOptions({ schemaOptions })
export class UserSchema extends BaseSchema {
  @Prop({
    required: true,
  })
  public name: string;

  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({
    required: true,
  })
  public password: string;
}

export class UserModel {
  public static model: Model<UserSchema>;

  private constructor() {}

  public static getModel(): Model<UserSchema> {
    if (!UserModel.model) {
      UserModel.model = getModelForClass(UserSchema);
    }

    return UserModel.model;
  }
}
