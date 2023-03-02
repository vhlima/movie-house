import { NotFoundError } from './NotFoundError';

export class ReviewNotFoundError extends NotFoundError {
  constructor() {
    super('ReviewNotFoundError', 'Review not found.');
  }
}
