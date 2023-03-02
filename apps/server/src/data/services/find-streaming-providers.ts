import { StreamingProvider } from '../../domain/entities';
import { FindStreamingProviders } from '../../domain/usecases';
import { IStreamingProviderRepository } from '../contracts';

export class FindStreamingProvidersService implements FindStreamingProviders {
  constructor(
    private readonly streamingProviderRepository: IStreamingProviderRepository,
  ) {}

  async handle(): Promise<StreamingProvider[]> {
    const streamingProviders =
      await this.streamingProviderRepository.getStreamingProviders();

    return streamingProviders.map(provider => ({
      id: provider.provider_id,
      logoPath: provider.logo_path,
      name: provider.provider_name,
      displayPriority: provider.display_priority,
    }));
  }
}
