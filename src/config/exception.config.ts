export class BaseException extends Error {
  public type: string;
  public statusCode: number;
  public errorMessage: string;

  constructor(type: string, statusCode: number, errorMessage: string) {
    super(errorMessage);
    this.type = type;
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;
  }
}

export class InternalServerException extends BaseException {
  constructor(message: string) {
    super('Internal Server Error', 500, message);
  }
}

export class NotFoundException extends BaseException {
  constructor(message: string) {
    super('Not found', 404, message);
  }
}

export class BadRequestException extends BaseException {
  constructor(message: string) {
    super('Bad Request', 400, message);
  }
}

export class UnauthorizedException extends BaseException {
  constructor(message: string) {
    super('Unauthorized', 401, message);
  }
}

export class ForbiddenException extends BaseException {
  constructor(message: string) {
    super('Forbidden', 403, message);
  }
}

export class ValidationException extends BaseException {
  constructor(message: string) {
    super('Validation Error', 400, message);
  }
}
