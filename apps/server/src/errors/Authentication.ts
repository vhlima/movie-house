import Error from './Error';

export default class AuthenticationError extends Error {
  constructor() {
    super('UserNotFound', 'You must be authenticated to do that', '401');
  }
}
