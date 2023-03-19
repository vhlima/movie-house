import { useSingleDropdown } from '@/hooks/useSingleDropdown';

import type { SortButtonIntent } from '../SortButton';

import SortButton from '../SortButton';
import SortDropdown from '../SortDropdown';

interface Props {
  intent?: SortButtonIntent;
  pathname: string;
}

export const SortByRatingButton: React.FC<Props> = ({ intent, pathname }) => {
  const { dropdownOpen, openDropdown, closeDropdown } = useSingleDropdown();

  const rating = [{ id: '-1', name: 'All time' }];

  return (
    <SortButton
      text="Rating"
      intent={intent}
      isOpen={dropdownOpen === 'rating'}
      onClick={() => openDropdown('rating')}
      onClose={() => closeDropdown()}
    >
      <SortDropdown
        singleOption
        items={rating}
        queryKey="rating"
        pathname={{
          clean: pathname,
          sort: `${pathname}/rating/[rating]`,
        }}
      />
    </SortButton>
  );
};
