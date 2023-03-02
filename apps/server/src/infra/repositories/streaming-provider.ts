import { IStreamingProviderRepository } from '../../data/contracts';

import { StreamingProviderModel } from '../../data/models';

import { TmdbRepository } from './tmdb';

export class StreamingProviderRepository
  extends TmdbRepository
  implements IStreamingProviderRepository
{
  async getStreamingProviders(): Promise<StreamingProviderModel[]> {
    try {
      const providers = await this.get('watch/providers/movie', {
        params: {
          watch_region: 'US',
        },
      });

      if (!providers) {
        return [];
      }

      const results = providers.results as any[];

      return results
        .sort((p1, p2) => p1.display_priority - p2.display_priority)
        .slice(0, 5);
    } catch (err) {
      return [];
    }
  }
}
