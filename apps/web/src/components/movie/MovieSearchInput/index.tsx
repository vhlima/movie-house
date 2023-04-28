import type { InputHTMLAttributes } from 'react';

import clsx from 'clsx';

import type { Movie } from '@/gql';

import { useOutsideClick } from '@/hooks/useOutsideClick';
import { Button, Input } from '@/components';
import { parseISO } from '../../../utils/date-utils';

import { useLogic } from './logic';

export type MovieSearchResult = {
  id: Movie['id'];
  posterUrl: Movie['posterUrl'];
  originalTitle: Movie['originalTitle'];
  releaseDate?: Movie['releaseDate'];
};

interface MovieSearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  styleType?: 'primary' | 'secondary';
  dropdown?: boolean;
  onSelectMovie: (movie: MovieSearchResult) => void;
}

export const MovieSearchInput: React.FC<MovieSearchInputProps> = ({
  styleType = 'primary',
  dropdown,
  onSelectMovie,
  ...props
}) => {
  const { searchResults, resetSearchResults, setSearchTerm } = useLogic();

  const { elementRef, handleBlur } = useOutsideClick<HTMLDivElement>();

  const hasAnySearchResult = searchResults.length > 0;

  return (
    <div
      className="relative"
      ref={elementRef}
      onBlur={e => handleBlur(e, resetSearchResults)}
    >
      <Input.Container
        className={clsx('w-full rounded-md lg:w-auto', {
          'rounded-b-none': hasAnySearchResult,
        })}
        rounded="none"
        styleType={styleType}
      >
        <Input
          id="searchMovie"
          formik={false}
          onChange={e => {
            setSearchTerm(e.target.value);
            resetSearchResults();
          }}
          {...props}
        />
      </Input.Container>

      {hasAnySearchResult && (
        <ul
          className={clsx(
            'flex flex-col w-full rounded-md rounded-t-none max-h-40 overflow-x-hidden overflow-y-auto bg-grey-800',
            {
              'absolute top-full left-1/2 transform -translate-x-1/2 z-50':
                dropdown,
            },
          )}
        >
          {searchResults.map(movie => (
            <li key={movie.id}>
              <Button
                className="h-max py-2"
                intent="secondary"
                rounded={false}
                onClick={() => onSelectMovie(movie)}
              >
                {movie.originalTitle}

                {movie.releaseDate &&
                  ` (${parseISO(movie.releaseDate).getFullYear()})`}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
