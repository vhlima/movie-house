import Error from './Error';

export default class AlreadyExistsError extends Error {
  constructor(message: string) {
    super('UserNotFound', message, '409');
  }
}
