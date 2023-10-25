export abstract class BaseError extends Error {
  abstract errorType: string;
  abstract errorCode: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }

  abstract serializeErrors(): {
    message: string;
    property?: string;
    status?: string;
  }[];
}
