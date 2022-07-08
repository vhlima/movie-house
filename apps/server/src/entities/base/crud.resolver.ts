import { Arg, ClassType, Mutation, Query, Resolver } from 'type-graphql';

import { ReturnModelType } from '@typegoose/typegoose';

export const createCrudResolver = <
  T extends ClassType,
  I extends ClassType,
  E extends ReturnModelType<T>,
>(
  suffix: string,
  objectTypeCls: T,
  inputTypeCls: I,
  entityTypeCls: E,
) => {
  const cammelSuffix = suffix.charAt(0).toLowerCase() + suffix.slice(1);

  @Resolver({ isAbstract: true })
  abstract class BaseResolver {
    @Query(() => [objectTypeCls], { name: `get${suffix}s` })
    async all(): Promise<T[]> {
      const all = await entityTypeCls.find();

      return all;
    }

    @Query(() => objectTypeCls, { name: `get${suffix}` })
    async get(@Arg(`${suffix}Id`) id: string): Promise<T> {
      const result = await entityTypeCls.findById(id);

      if (!result) {
        throw new Error(`${suffix} not found`);
      }

      return result;
    }

    @Mutation(() => objectTypeCls, { name: `create${suffix}` })
    async create(@Arg('data', () => inputTypeCls) data: I) {
      const created = await entityTypeCls.create(data);

      if (!created) {
        throw new Error(`Error creating ${suffix}`);
      }

      return created;
    }

    @Mutation(() => objectTypeCls, { name: `update${suffix}` })
    async update(
      @Arg(`${cammelSuffix}Id`) id: string,
      @Arg('data', () => inputTypeCls) data: I,
    ) {
      const updated = await entityTypeCls.findByIdAndUpdate(id, data, {
        new: true,
      });

      if (!updated) {
        throw new Error(`${suffix} not found`);
      }

      return updated;
    }
  }

  return BaseResolver;
};
