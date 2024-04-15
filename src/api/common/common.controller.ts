import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpGet,
  httpMethod,
} from 'inversify-express-utils';
import { CommonService } from './common.service';
import { NotFoundException } from '../../config';

@controller('/')
export class CommonController extends BaseHttpController {
  constructor(
    @inject(CommonService) private readonly commonService: CommonService
  ) {
    super();
  }

  @httpGet('/')
  public getGreetings(): { message: string } {
    return this.commonService.getGreetings();
  }

  @httpMethod('all', '*')
  public getNotFound(): string {
    throw new NotFoundException('Endpoint not found');
  }
}
