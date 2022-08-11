import { ApolloError } from 'apollo-server';

export default class AlreadyExistsError extends ApolloError {
  constructor(message: string) {
    super(message, '409');

    Object.defineProperty(this, 'name', { value: 'UserNotFound' });
  }
}
