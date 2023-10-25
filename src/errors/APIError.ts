import { BaseError } from './BaseError';
import { StatusCodes } from '../types/statusCodes';

class APIError extends BaseError {
  errorCode = StatusCodes.BAD_REQUEST;
  errorType = 'VALIDATION_ERROR';

  constructor(
    message: string,
    private property: string,
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }

  serializeErrors() {
    return [{ message: this.message, property: this.property }];
  }
}

export default APIError;
