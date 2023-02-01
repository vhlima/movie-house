import clsx from 'clsx';

import { useFindMovieGenresQuery } from '../../../../../../../graphql';

import Link from '../../../../../../../components/Link';
import SvgIcon from '../../../../../../../components/SvgIcon';
import Typography from '../../../../../../../components/Typography';

import { useLogic } from './logic';

const MovieGenreList: React.FC = () => {
  const { selectedGenres, buildGenreUrl } = useLogic();

  const { data, loading } = useFindMovieGenresQuery();

  const movieGenres = [
    { id: -1, name: 'Any genre' },
    ...(data ? data.movieGenres : []),
  ];

  if (loading) {
    return null;
  }

  return (
    <ul>
      {movieGenres.map((genre, index) => {
        const isGenreSelected =
          index === 0
            ? selectedGenres.length === 0
            : selectedGenres.includes(genre.id);

        return (
          <li
            className={clsx('text-left hover:bg-grey-700', {
              'border-y border-y-grey-500': index === 0,
            })}
            key={`movie-genre-${genre.id}`}
          >
            <Link
              className={clsx('relative pl-6 p-1 block')}
              {...buildGenreUrl(genre.id)}
            >
              {index > 0 && isGenreSelected && (
                <SvgIcon
                  className="absolute left-1 top-2 text-success-base"
                  iconType="FiCheck"
                  size={16}
                />
              )}

              <Typography
                className={clsx('whitespace-nowrap', {
                  'font-bold': isGenreSelected,
                })}
                component="span"
                size="sm"
              >
                {genre.name}
              </Typography>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieGenreList;
