import { ApolloError } from 'apollo-server';

export default class BadRequestError extends ApolloError {
  constructor(message: string) {
    super(message, '400');

    Object.defineProperty(this, 'name', { value: 'BadRequestError' });
  }
}
