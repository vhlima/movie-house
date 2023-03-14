import { BaseError } from './BaseError';

export class AuthenticationError extends BaseError {
  constructor() {
    super('AuthenticationError', 'You must be authenticated to do that.', 401);
  }
}
