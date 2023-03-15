import { useFindStreamingProvidersQuery } from '@/graphql';

import SortDropdown from '../SortDropdown';

interface ServiceListProps {
  pathname: string;
}

const ServiceList: React.FC<ServiceListProps> = ({ pathname }) => {
  const { data: streamProvidersData } = useFindStreamingProvidersQuery();

  if (!streamProvidersData) {
    return null;
  }

  const providers = [
    { id: '-1', name: 'Any service' },
    ...streamProvidersData.streamingProviders.map(provider => ({
      id: `${provider.name.toLowerCase()}`,
      name: provider.name,
    })),
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

export default ServiceList;
