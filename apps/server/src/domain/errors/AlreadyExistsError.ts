import { BaseError } from './BaseError';

export class AlreadyExistsError extends BaseError {
  constructor(message: string) {
    super('AlreadyExistsError', message, 409);
  }
}
