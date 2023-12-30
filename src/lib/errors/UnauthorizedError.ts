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

export default UnauthorizedError;
