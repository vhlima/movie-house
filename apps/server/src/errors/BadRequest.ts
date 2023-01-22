import Error from './Error';

export default class BadRequestError extends Error {
  constructor(message: string) {
    super('BadRequestError', message, '400');
  }
}
