import { BaseError } from './BaseError';

export class UnauthorizedError extends BaseError {
  constructor() {
    super('UnauthorizedError', 'You dont have permission to do that.', 401);
  }
}
