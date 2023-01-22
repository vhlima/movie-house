import Error from './Error';

export default class AuthorizationError extends Error {
  constructor() {
    super('AuthorizationError', 'You dont have permission to do that', '403');
  }
}
