import type { MovieGenre } from '@/graphql';

import { Button } from '@/components';
import { useSortLinkBuilder } from '@/hooks/useSortLinkBuilder';

interface MovieGenresProps {
  genres: MovieGenre[];
}

export const MovieGenres: React.FC<MovieGenresProps> = ({ genres }) => {
  const { buildFilteredHref } = useSortLinkBuilder({
    pathname: {
      clean: '/movies',
      sort: '/movies/genre/[genre]',
    },
    queryKey: 'genre',
    singleOption: true,
  });

  return (
    <ul className="flex gap-2 flex-wrap">
      {genres.map(genre => (
        <li
          className="border border-grey-700 rounded-md overflow-hidden"
          key={`movie-genre-${genre.id}`}
        >
          <Button
            intent="tertiary"
            size="sm"
            rounded={false}
            href={buildFilteredHref(genre.name).href}
          >
            {genre.name}
          </Button>
        </li>
      ))}
    </ul>
  );
};
