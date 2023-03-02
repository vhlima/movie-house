import { Resolver, Query } from 'type-graphql';

import { StreamingProviderEntity } from '../../../infra/entities';

import { getFindStreamingProvidersService } from '../../factories';

@Resolver(() => StreamingProviderEntity)
export class StreamingProviderResolver {
  @Query(() => [StreamingProviderEntity])
  async streamingProviders() {
    const findStreamingProvidersResponse = getFindStreamingProvidersService();

    const streamingProvidersResponse =
      await findStreamingProvidersResponse.handle();

    return streamingProvidersResponse;
  }
}
