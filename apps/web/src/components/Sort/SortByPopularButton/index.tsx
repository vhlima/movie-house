import { useSingleDropdown } from '@/hooks/useSingleDropdown';

import type { SortButtonIntent } from '../SortButton';

import SortButton from '../SortButton';
import SortDropdown from '../SortDropdown';

interface Props {
  intent?: SortButtonIntent;
  pathname: string;
}

export const SortByPopularButton: React.FC<Props> = ({ intent, pathname }) => {
  const { dropdownOpen, openDropdown, closeDropdown } = useSingleDropdown();

  const popular = [
    { id: '-1', name: 'All time' },
    { id: 'year', name: 'This year' },
  ];

  return (
    <SortButton
      text="Popular"
      intent={intent}
      isOpen={dropdownOpen === 'popular'}
      onClick={() => openDropdown('popular')}
      onClose={() => closeDropdown()}
    >
      <SortDropdown
        singleOption
        items={popular}
        queryKey="popularity"
        pathname={{
          clean: pathname,
          sort: `${pathname}/popularity/[popularity]`,
        }}
      />
    </SortButton>
  );
};
