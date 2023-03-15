import { useState } from 'react';

import type { PropsWithChildren } from 'react';

import clsx from 'clsx';

import { Button } from '@/components';

import MovieSearchModal from '../../../../../components/movie/MovieSearchModal';

import type { MovieSearchResult } from '../../../../../components/movie/MovieSearchModal';

interface MovieSearchButtonProps {
  className?: string;
  onSearchResult: (searchResult: MovieSearchResult) => void;
}

const MovieSearchButton: React.FC<
  PropsWithChildren<MovieSearchButtonProps>
> = ({ className, onSearchResult, children }) => {
  const [isSearch, setSearch] = useState<boolean>(false);

  return (
    <>
      {isSearch && (
        <MovieSearchModal
          title="Search a movie to review"
          onSelect={searchResult => {
            onSearchResult(searchResult);
            setSearch(false);
          }}
          onClose={() => setSearch(false)}
        />
      )}

      <Button
        className={clsx('mt-auto', className && className)}
        buttonStyle="secondary"
        onClick={() => setSearch(true)}
      >
        {children}
      </Button>
    </>
  );
};

export default MovieSearchButton;
