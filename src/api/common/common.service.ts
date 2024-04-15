import { injectable } from 'inversify';

@injectable()
export class CommonService {
  public getGreetings(): { message: string } {
    return {
      message: 'Express TS',
    };
  }
}
