import { Resolver, Query, Ctx } from 'type-graphql';

import type { ServerContext } from '../types';

import StreamingProvider from '../objects/streaming-provider';

@Resolver(() => StreamingProvider)
class StreamingProviderResolver {
  @Query(() => [StreamingProvider])
  async streamProviders(@Ctx() { dataSources }: ServerContext) {
    const providersResponse = await dataSources.tmdb.getStreamingProviders();

    return providersResponse;
  }
}

export default StreamingProviderResolver;
