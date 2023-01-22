import { GraphQLError } from 'graphql';

export default class Error extends GraphQLError {
  constructor(name: string, message: string, errorCode?: string) {
    super(message);

    this.extensions.code = errorCode;
    this.name = name;
  }
}
