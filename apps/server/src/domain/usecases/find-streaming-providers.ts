import { StreamingProvider } from '../entities';

export interface FindStreamingProviders {
  handle: () => Promise<StreamingProvider[]>;
}
