import { parseISO } from 'date-fns';

import type { MovieData } from '../../../../graphql/Movie/types';

import { useLogic } from './logic';

import type { ModalHandles } from '../../../../components/Modal';

import Modal from '../../../../components/Modal';

import Input from '../../../../components/Input';

import Button from '../../../../components/Button';

interface MovieSearchModalProps extends ModalHandles {
  title: string;
  description?: string;
  errors?: string[];
  onFocus?: () => void;
  onSelect: (movie: MovieData) => void;
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
      <div className="mb-4">
        <h1 className="text-grey-100 text-lg">{title}</h1>

        {description && <p className="text-grey-200">{description}</p>}
      </div>

      <Input
        name="searchMovie"
        inputStyle="secondary"
        label={{ text: "Enter the movie's name", htmlFor: true }}
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
        <ul className="flex flex-col rounded-md border border-grey-900 max-h-40 overflow-x-hidden overflow-y-scroll">
          {searchResults.map(movie => (
            <li key={movie.id}>
              <Button
                buttonStyle="secondary"
                buttonSize="xs"
                rounded={false}
                onClick={() => onSelect(movie)}
              >
                <span className="text-grey-100">
                  {movie.originalTitle}

                  {movie.releaseDate &&
                    ` (${new Date(movie.releaseDate).getFullYear()})`}
                </span>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
};

export default MovieSearchModal;
