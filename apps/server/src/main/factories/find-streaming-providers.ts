import { FindStreamingProvidersService } from '../../data/services';

import { StreamingProviderRepository } from '../../infra/repositories';

export function getFindStreamingProvidersService(): FindStreamingProvidersService {
  const service = new FindStreamingProvidersService(
    new StreamingProviderRepository(),
  );

  return service;
}
