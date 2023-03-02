import { BaseError } from './BaseError';

export class NotFoundError extends BaseError {
  constructor(name: string, message: string) {
    super(name, message, 404);
  }
}
