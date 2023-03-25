import { useFindStreamingProvidersQuery } from '@/graphql';

import { SortDropdown } from '../SortDropdown';

interface Props {
  pathname: string;
}

export const ServiceDropdown: React.FC<Props> = ({ pathname }) => {
  const { data: streamProvidersData } = useFindStreamingProvidersQuery();

  const providers = [
    { id: '-1', name: 'Any service' },
    ...(streamProvidersData ? streamProvidersData.streamingProviders : []).map(
      provider => ({
        id: `${provider.name.toLowerCase()}`,
        name: provider.name,
      }),
    ),
  ];

  return (
    <SortDropdown
      items={providers}
      queryKey="on"
      pathname={{
        clean: pathname,
        sort: `${pathname}/on/[on]`,
      }}
    />
  );
};
