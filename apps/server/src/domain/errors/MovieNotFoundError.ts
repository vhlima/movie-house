import { BaseError } from './BaseError';

export class MovieNotFoundError extends BaseError {
  constructor() {
    super('MovieNotFoundError', 'Movie not found.', 404);
  }
}
