import { useFindStreamingProvidersQuery } from '@/graphql';

import { useSingleDropdown } from '@/hooks/useSingleDropdown';

import type { SortButtonIntent } from '../SortButton';

import SortButton from '../SortButton';
import SortDropdown from '../SortDropdown';

interface Props {
  intent?: SortButtonIntent;
  pathname: string;
}

export const SortByServiceButton: React.FC<Props> = ({ intent, pathname }) => {
  const { dropdownOpen, openDropdown, closeDropdown } = useSingleDropdown();

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
    <SortButton
      text="Service"
      intent={intent}
      isOpen={dropdownOpen === 'service'}
      onClick={() => openDropdown('service')}
      onClose={() => closeDropdown()}
    >
      <SortDropdown
        items={providers}
        queryKey="on"
        pathname={{
          clean: pathname,
          sort: `${pathname}/on/[on]`,
        }}
      />
    </SortButton>
  );
};
