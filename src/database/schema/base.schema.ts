import { Transform } from 'class-transformer';

export class BaseSchema {
  @Transform((value) => {
    if ('value' in value) {
      return value.obj[value.key].toString();
    }

    return 'unknown value';
  })
  public readonly _id: string;

  public readonly __v: number;
}
