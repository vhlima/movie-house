import type { AddFavoriteMovieModalLogicProps } from './logic';

import { useLogic } from './logic';

import Modal from '../../../../../../components/Modal';

import Input from '../../../../../../components/Input';

import Button from '../../../../../../components/Button';

const AddFavoriteMovieModal: React.FC<AddFavoriteMovieModalLogicProps> = ({
  onClose,
}) => {
  const { searchResults, resetSearchResults, setSearchTerm, addFavoriteMovie } =
    useLogic({ onClose });

  return (
    <Modal center onClickBackdrop={onClose}>
      <h1 className="text-grey-100 text-lg">Pick a favorite movie</h1>

      <p className="text-grey-200 mb-4">
        Select one of your favorite movies to display on your profile
      </p>

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
                onClick={() => addFavoriteMovie(movie.id)}
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

export default AddFavoriteMovieModal;
