import { BaseError } from './BaseError';

export class InternalError extends BaseError {
  constructor() {
    super('InternalError', 'Internal error occurred.', 500);
  }
}
