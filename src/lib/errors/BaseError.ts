export abstract class BaseError extends Error {
  abstract errorCode: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    Error.captureStackTrace(this);
  }

  abstract serializeErrors(): {
    message: string;
    property?: string;
    status?: number;
  }[];
}
