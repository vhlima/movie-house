import type { MovieResponse } from '../../../../types/movie';

import { useLogic } from './logic';

import type { ModalHandles } from '../../../../components/Modal';

import Modal from '../../../../components/Modal';

import Input from '../../../../components/Input';

import Button from '../../../../components/Button';

interface MovieSearchModalProps extends ModalHandles {
  title: string;
  description?: string;
  onSelect: (movie: MovieResponse) => void;
}

const MovieSearchModal: React.FC<MovieSearchModalProps> = ({
  title,
  description,
  onSelect,
  onClose,
}) => {
  const { searchResults, resetSearchResults, setSearchTerm } = useLogic();

  return (
    <Modal center backdrop onClose={onClose}>
      <div className="mb-4">
        <h1 className="text-grey-100 text-lg">{title}</h1>

        {description && <p className="text-grey-200">{description}</p>}
      </div>

      <Input
        name="searchMovie"
        inputStyle="secondary"
        // error={errors.join('')}
        label={{ text: "Enter the movie's name", htmlFor: true }}
        onChange={e => {
          setSearchTerm(e.target.value);
          resetSearchResults();
        }}
      />

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
                  {movie.original_title} (
                  {new Date(movie.release_date).getFullYear()})
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
