import { BaseError } from './BaseError';

class BadRequestError extends BaseError {
  errorCode: number;

  constructor(
    private property: string,
    private status: number,
    message = 'Bad request',
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }

  serializeErrors() {
    return [
      { message: this.message, property: this.property, status: this.status },
    ];
  }
}

export default BadRequestError;
