export abstract class BaseError extends Error {
  abstract errorCode: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    Error.captureStackTrace(this);
  }

  abstract serializeErrors(): {
    success: boolean;
    status?: number;
    errors: {
      message: string;
      property?: string;
    }[];
  };
}
