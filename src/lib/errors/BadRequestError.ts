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
    return {
      success: false,
      status: this.status,
      errors: [
        {
          message: this.message,
          property: this.property,
        },
      ],
    };
  }
}

export default BadRequestError;
