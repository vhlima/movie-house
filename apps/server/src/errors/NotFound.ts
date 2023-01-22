import Error from './Error';

export default class NotFoundError extends Error {
  constructor(message: string) {
    super('NotFound', message, '404');
  }
}
