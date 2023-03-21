import { getDecade, setYear } from 'date-fns';

import { SortDropdown } from '@/components/Sort/SortDropdown';

interface Props {
  pathname: string;
}

export const DecadeDropdown: React.FC<Props> = ({ pathname }) => {
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
    <SortDropdown
      singleOption
      items={decades}
      queryKey="decade"
      pathname={{
        clean: pathname,
        sort: `${pathname}/decade/[decade]`,
      }}
    />
  );
};
