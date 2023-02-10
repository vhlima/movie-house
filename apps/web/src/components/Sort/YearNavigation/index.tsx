import { getDecade } from 'date-fns';

import type { SortLinkPath } from '../../../hooks/useSortLinkBuilder';

import { useSortLinkBuilder } from '../../../hooks/useSortLinkBuilder';

import YearListItem from './components/YearListItem';

interface YearNavigationProps {
  path: SortLinkPath;
  year: number;
  isDecade?: boolean;
}

const YearNavigation: React.FC<YearNavigationProps> = ({
  path,
  year,
  isDecade,
}) => {
  const decade = getDecade(new Date(year, 1));

  const years = [
    decade,
    decade,
    ...Array.from({ length: 9 }).map((_, index) => decade + (index + 1)),
  ];

  const { pathname, query } = {
    ...(typeof path === 'string' ? { pathname: path, query: {} } : path),
  };

  const { buildFilteredHref } = useSortLinkBuilder({
    queryKey: 'year',
    singleOption: true,
    pathname: {
      clean: {
        pathname: `${pathname}/decade/[decade]`,
        query: {
          ...query,
          decade,
        },
      },
      sort: {
        pathname: `${pathname}/year/[year]`,
        query,
      },
    },
  });

  return (
    <ul className="flex justify-between border border-grey-800 rounded-sm">
      {years.map((currentYear, index) => (
        <YearListItem
          key={
            index === 0
              ? 'year-navigation-decade'
              : `year-navigation-${currentYear}`
          }
          text={index === 0 ? `${currentYear}s` : `${currentYear}`}
          selected={
            !isDecade
              ? currentYear === year && index > 0
              : currentYear === year && index === 0
          }
          link={
            index === 0
              ? {
                  href: {
                    pathname: `${pathname}/decade/[decade]`,
                    query: {
                      ...query,
                      decade,
                    },
                  },
                }
              : buildFilteredHref(`${currentYear}`)
          }
        />
      ))}
    </ul>
  );
};

export default YearNavigation;
