import { getDecade, setYear } from 'date-fns';

import { useSingleDropdown } from '@/hooks/useSingleDropdown';

import type { SortButtonIntent } from '../SortButton';

import SortButton from '../SortButton';
import SortDropdown from '../SortDropdown';

interface Props {
  intent?: SortButtonIntent;
  pathname: string;
}

export const SortByDecadeButton: React.FC<Props> = ({ intent, pathname }) => {
  const { dropdownOpen, openDropdown, closeDropdown } = useSingleDropdown();

  const decadeDate = setYear(new Date(), getDecade(new Date()));

  const decades = [
    { id: '-1', name: 'Any decade' },
    ...Array.from({ length: 16 }).map((_, index) => {
      const previousDecade = setYear(
        new Date(decadeDate),
        decadeDate.getFullYear() - 10 * index,
      );

      return {
        id: `${previousDecade.getFullYear()}`,
        name: `${previousDecade.getFullYear()}s`,
      };
    }),
  ];

  return (
    <SortButton
      text="Decade"
      intent={intent}
      isOpen={dropdownOpen === 'decade'}
      onClick={() => openDropdown('decade')}
      onClose={() => closeDropdown()}
    >
      <SortDropdown
        singleOption
        items={decades}
        queryKey="decade"
        pathname={{
          clean: pathname,
          sort: `${pathname}/decade/[decade]`,
        }}
      />
    </SortButton>
  );
};
