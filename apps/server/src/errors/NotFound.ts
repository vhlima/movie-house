import { ApolloError } from 'apollo-server';

export default class NotFoundError extends ApolloError {
  constructor(message: string) {
    super(message, '404');

    Object.defineProperty(this, 'name', { value: 'NotFound' });
  }
}
