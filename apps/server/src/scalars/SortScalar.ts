import { GraphQLScalarType, Kind } from 'graphql';

export const SortScalar = new GraphQLScalarType({
  name: 'Sort',
  description: 'Sort scalar type',
  parseValue(value: unknown) {
    if (typeof value === 'string') {
      return value;
    }
    if (typeof value === 'number') {
      return value;
    }
    if (Array.isArray(value) && value.length) {
      return value;
    }

    throw new Error(
      `Sort must be a string, number, or an array of strings, got: ${JSON.stringify(
        value,
      )}`,
    );
  },
  parseLiteral(ast) {
    switch (ast.kind) {
      case Kind.STRING:
        return ast.value;
      case Kind.INT:
      case Kind.FLOAT:
        return ast.value;
      case Kind.LIST:
        return ast.values.map(v => (v as { value: string | number }).value);
      default:
        break;
    }
    throw new Error(
      `Sort must be a string, number, or an array of strings, got: ${JSON.stringify(
        ast,
      )}`,
    );
  },
  serialize(value) {
    return value;
  },
});

export default SortScalar;
