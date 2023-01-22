import Error from './Error';

export default class UserNotFoundError extends Error {
  constructor() {
    super('UserNotFound', 'User not found', '404');
  }
}
