import { useRouter } from 'next/router';

import type { LinkProps } from '../../../../../../../components/Link';

export function useLogic() {
  const { query } = useRouter();

  const selectedGenres = query.genre
    ? (query.genre as string).split(',').map(genre => parseInt(genre, 10))
    : [];

  function buildGenreUrl(genreId: number): LinkProps {
    if (genreId === -1) {
      return {
        href: {
          pathname: '/users/[username]/films',
          query: { username: 'vhlima' },
        },
      };
    }

    const isGenreSelected = selectedGenres.includes(genreId);

    if (isGenreSelected && selectedGenres.length <= 1) {
      return {
        href: {
          pathname: '/users/[username]/films',
          query: { username: 'vhlima' },
        },
      };
    }

    return {
      href: {
        pathname: '/users/[username]/films/genre/[genre]',
        query: {
          username: 'vhlima',
          genre: isGenreSelected
            ? selectedGenres.filter(genre => genre !== genreId).join(',')
            : [...selectedGenres, genreId].join(','),
        },
      },
    };
  }

  return {
    selectedGenres,
    buildGenreUrl,
  };
}
