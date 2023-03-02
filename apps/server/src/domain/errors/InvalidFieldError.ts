import { BaseError } from './BaseError';

export class InvalidFieldError extends BaseError {
  constructor(message: string) {
    super('InvalidFieldError', message, 403);
  }
}
