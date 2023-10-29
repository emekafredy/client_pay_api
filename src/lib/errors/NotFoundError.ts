import { BaseError } from './BaseError';
import { StatusCodes } from '../../types/statusCodes';

class NotFoundError extends BaseError {
  errorCode: number;

  constructor(
    private property: string,
    private status = StatusCodes.NOT_FOUND,
    message = `${property} not found`,
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

export default NotFoundError;
