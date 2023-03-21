import { useRouter } from 'next/router';

import { SortButton, SortDropdown } from '@/components/Sort';

import { SingleDropdown } from '@/hooks/useSingleDropdown';

const dropdownItems = [
  {
    id: '-1',
    name: 'Newest',
  },
  {
    id: 'popularity',
    name: 'Popularity',
  },
  {
    id: 'name',
    name: 'Name',
  },
  {
    id: 'older',
    name: 'Older',
  },
  {
    id: 'updated',
    name: 'Last updated',
  },
];

const SortButtons: React.FC = () => {
  const { asPath } = useRouter();

  const rootPath = asPath.split('/').slice(0, 4).join('/');

  return (
    <SingleDropdown>
      <SortButton type="list" text="Sort by" intent="secondary">
        <SortDropdown
          singleOption
          items={dropdownItems}
          queryKey="sortType"
          pathname={{
            clean: rootPath,
            sort: `${rootPath}/by/[sortType]`,
          }}
        />
      </SortButton>
    </SingleDropdown>
  );
};

export default SortButtons;
