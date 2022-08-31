import { ApolloError } from 'apollo-server';

export default class AuthorizationError extends ApolloError {
  constructor() {
    super('You dont have permission to do that', '403');

    Object.defineProperty(this, 'name', { value: 'AuthorizationError' });
  }
}
