import { ApolloError } from 'apollo-server';

export default class UserNotFoundError extends ApolloError {
  constructor() {
    super('Error: User not found', '404');

    Object.defineProperty(this, 'name', { value: 'UserNotFound' });
  }
}
