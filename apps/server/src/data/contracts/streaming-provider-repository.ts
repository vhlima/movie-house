import { StreamingProviderModel } from '../models';

export interface IStreamingProviderRepository {
  getStreamingProviders(): Promise<StreamingProviderModel[]>;
}
