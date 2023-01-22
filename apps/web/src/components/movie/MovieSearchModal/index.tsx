import { parseISO } from 'date-fns';

import type { Movie } from '../../../graphql';

import type { ModalHandles } from '../../Modal';

import { useLogic } from './logic';

import Modal from '../../Modal';

import Input from '../../Input';

import Button from '../../Button';

import Typography from '../../Typography';

export type MovieSearchResult = {
  id: Movie['id'];
  posterUrl: Movie['posterUrl'];
  originalTitle: Movie['originalTitle'];
  releaseDate?: Movie['releaseDate'];
};

interface MovieSearchModalProps extends ModalHandles {
  title: string;
  description?: string;
  errors?: string[];
  onFocus?: () => void;
  onSelect: (movie: MovieSearchResult) => void;
}

const MovieSearchModal: React.FC<MovieSearchModalProps> = ({
  title,
  errors = [],
  description,
  onSelect,
  onFocus,
  onClose,
}) => {
  const { searchResults, error, resetSearchResults, setSearchTerm } =
    useLogic();

  if (error) {
    errors.push(error.message);
  }

  // TODO bug: when submit request has an error, it starts searching again for the same result even if user didnt typed anything

  return (
    <Modal center backdrop onClose={onClose}>
      <Modal.Header>
        <Modal.Title text={title} />

        {description && <Typography component="h2">{description}</Typography>}

        <Modal.CloseButton onClose={onClose} />
      </Modal.Header>

      <Input
        name="searchMovie"
        inputStyle="secondary"
        label={{ text: 'Search for a movie', htmlFor: true }}
        onFocus={onFocus}
        onChange={e => {
          setSearchTerm(e.target.value);
          resetSearchResults();
        }}
      />

      {errors.length > 0 && (
        <span className="text-danger-base">{errors.join('')}</span>
      )}

      {searchResults.length > 0 && (
        <ul className="mt-0.5 flex flex-col rounded-md border border-grey-900 max-h-40 overflow-x-hidden overflow-y-auto">
          {searchResults.map(movie => (
            <li key={movie.id}>
              <Button
                buttonStyle="secondary"
                buttonSize="xs"
                rounded={false}
                onClick={() => onSelect(movie)}
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
    </Modal>
  );
};

export default MovieSearchModal;
