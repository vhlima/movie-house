export class BaseError extends Error {
  statusCode: number;

  constructor(name: string, message: string, statusCode: number) {
    super(name);
    this.message = message;
    this.statusCode = statusCode;
  }
}
