import { ApolloError } from 'apollo-server';

export default class AuthenticationError extends ApolloError {
  constructor() {
    super('You must be authenticated to do that', '401');

    Object.defineProperty(this, 'name', { value: 'UserNotFound' });
  }
}
