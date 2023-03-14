import { BaseError } from './BaseError';

export class LimitReachedError extends BaseError {
  constructor(message: string) {
    super('LimitReachedError', message, 419);
  }
}
