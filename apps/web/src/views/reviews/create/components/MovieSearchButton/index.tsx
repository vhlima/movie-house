import { useState } from 'react';

import type { PropsWithChildren } from 'react';

import Button from '../../../../../components/Button';

import MovieSearchModal from '../../../../../components/movie/MovieSearchModal';

import type { MovieSearchResult } from '../../../../../components/movie/MovieSearchModal';

interface MovieSearchButtonProps {
  onSearchResult: (searchResult: MovieSearchResult) => void;
}

const MovieSearchButton: React.FC<
  PropsWithChildren<MovieSearchButtonProps>
> = ({ onSearchResult, children }) => {
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
        className="mt-auto"
        buttonStyle="secondary"
        onClick={() => setSearch(true)}
      >
        {children}
      </Button>
    </>
  );
};

export default MovieSearchButton;
