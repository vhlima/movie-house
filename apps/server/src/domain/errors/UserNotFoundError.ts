import { BaseError } from './BaseError';

export class UserNotFoundError extends BaseError {
  constructor() {
    super('UserNotFoundError', 'User not found.', 400);
  }
}
