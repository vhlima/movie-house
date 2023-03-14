import { NotFoundError } from './NotFoundError';

export class PageNotFoundError extends NotFoundError {
  constructor() {
    super('PageNotFoundError', 'Page not found.');
  }
}
