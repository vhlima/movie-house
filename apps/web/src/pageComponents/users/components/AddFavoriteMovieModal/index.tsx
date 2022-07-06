import React, { useEffect, useState } from 'react';

import { MovieData } from '../../../../types';

import { movieList } from '../../../../data/fakeData';

import Modal from '../../../../components/Modal';

import Input from '../../../../components/Input';

import Button from '../../../../components/Button';

interface AddFavoriteMovieModalProps {
  onSelect: (movie: MovieData) => void;
  onClose: () => void;
}

const AddFavoriteMovieModal: React.FC<AddFavoriteMovieModalProps> = ({
  onSelect,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [searchResults, setSearchResults] = useState<MovieData[]>([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // TODO dont search on first render
      if (searchTerm) {
        setSearchResults(movieList);
      }
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <Modal
      className="fixed top-1/4 left-1/2 transform -translate-x-1/2 w-11/12 rounded-md"
      onClickBackdrop={onClose}
    >
      <h1 className="text-grey-100 text-lg">Pick a favorite movie</h1>

      <p className="text-grey-200 mb-4">
        Select one of your favorite movies to display on your profile
      </p>

      <Input
        name="searchMovie"
        label={{ text: "Enter the movie's name", htmlFor: true }}
        onChange={e => {
          setSearchTerm(e.target.value);
          setSearchResults([]);
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
                  {movie.name} ({movie.releaseDate.year})
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
