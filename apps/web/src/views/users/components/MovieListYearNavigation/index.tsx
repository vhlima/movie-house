import clsx from 'clsx';

import { getDecade } from 'date-fns';
import { useRouter } from 'next/router';

import Link from '../../../../components/Link';

import Typography from '../../../../components/Typography';

interface MovieListYearNavigationProps {
  year: number;
  isDecade?: boolean;
}

const MovieListYearNavigation: React.FC<MovieListYearNavigationProps> = ({
  year,
  isDecade,
}) => {
  const { query, asPath } = useRouter();

  const rootPath = asPath.split('/')[3];

  const decade = getDecade(new Date(year, 1));

  const decadeYears = [
    decade,
    decade,
    ...Array.from({ length: 9 }).map((_, index) => decade + (index + 1)),
  ];

  return (
    <ul className="flex justify-between border border-grey-800 rounded-sm">
      {decadeYears.map((currentYear, index) => (
        <li
          className={clsx(
            'w-full p-1 border-r border-r-grey-700 last-of-type:border-r-0',
            {
              'bg-grey-700': !isDecade
                ? currentYear === year && index > 0
                : currentYear === year && index === 0,
            },
          )}
          key={`decade-year-${index === 0 ? 'decade' : currentYear}`}
        >
          <Link
            href={{
              pathname:
                index === 0
                  ? `/users/[username]/${rootPath}/decade/[decade]`
                  : `/users/[username]/${rootPath}/year/[year]`,
              query: {
                username: query.username,
                ...(index === 0 ? { decade } : { year: currentYear }),
              },
            }}
          >
            <Typography
              className="block text-center"
              component="span"
              size="sm"
            >
              {index === 0 ? `${currentYear}s` : currentYear}
            </Typography>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieListYearNavigation;
