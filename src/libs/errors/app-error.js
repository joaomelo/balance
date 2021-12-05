export class AppError extends Error {
  constructor ({ code, isOperational, meta = {} }) {
    super(code);
    this.code = code;
    this.isOperational = isOperational;
    this.meta = meta;

    Error.captureStackTrace(this, AppError);
  }
}
