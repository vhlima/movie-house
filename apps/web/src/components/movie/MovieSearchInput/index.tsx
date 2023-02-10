import { parseISO } from 'date-fns';

import type { InputHTMLAttributes } from 'react';

import clsx from 'clsx';
import type { Movie } from '../../../graphql';

import { useLogic } from './logic';

import Input from '../../Input';
import Button from '../../Button';
import Typography from '../../Typography';

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

const MovieSearchInput: React.FC<MovieSearchInputProps> = ({
  styleType = 'primary',
  dropdown,
  onSelectMovie,
  ...props
}) => {
  const { searchResults, resetSearchResults, setSearchTerm } = useLogic();

  const hasAnySearchResult = searchResults.length > 0;

  return (
    <div className="relative">
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
              'absolute top-[100%] left-1/2 transform -translate-x-1/2 z-50':
                dropdown,
            },
          )}
        >
          {searchResults.map(movie => (
            <li key={movie.id}>
              <Button
                buttonStyle="secondary"
                buttonSize="xs"
                rounded={false}
                onClick={() => onSelectMovie(movie)}
              >
                <Typography component="span" color="primary">
                  {movie.originalTitle}

                  {movie.releaseDate &&
                    ` (${parseISO(movie.releaseDate).getFullYear()})`}
                </Typography>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieSearchInput;