import { Prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
import { Document, Model, SchemaOptions } from 'mongoose';
import { ObjectId } from 'mongodb';
import { BaseSchema } from '../../../database/schema';

export interface IRefreshToken {
  user: string;
  token: string;
}

export interface IRefreshTokenDoc extends Document {
  _id: string;
  user: string;
  token: string;
}

const schemaOptions: SchemaOptions = {
  collection: 'refreshtokens',
  versionKey: false,
};

@modelOptions({ schemaOptions })
export class RefreshTokenSchema extends BaseSchema {
  @Prop({
    required: true,
    unique: true,
  })
  public user: ObjectId;

  @Prop({
    required: true,
  })
  public token: string;
}

export class RefreshTokenModel {
  public static model: Model<RefreshTokenSchema>;

  private constructor() {}

  public static getModel(): Model<RefreshTokenSchema> {
    if (!RefreshTokenModel.model) {
      RefreshTokenModel.model = getModelForClass(RefreshTokenSchema);
    }

    return RefreshTokenModel.model;
  }
}
