import { BaseError } from './BaseError';
import { StatusCodes } from '../../types/statusCodes';

class UnauthorizedError extends BaseError {
  errorCode: number;

  constructor(
    private status = StatusCodes.UNAUTHORIZED,
    message = 'Unauthorized to perform this action',
    private property = 'auth',
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

export default UnauthorizedError;
