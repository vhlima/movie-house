import type { PropsWithChildren } from 'react';

import type { Movie } from '@/graphql';

import { Typography, Input } from '@/components';
import type { ModalHandles } from '../../Modal';

import Modal from '../../Modal';
import MovieSearchInput from '../MovieSearchInput';
import ErrorText from '../../ErrorText';

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

const MovieSearchModal: React.FC<PropsWithChildren<MovieSearchModalProps>> = ({
  title,
  errors = [],
  description,
  onSelect,
  onFocus,
  onClose,
  children,
}) => {
  const a = 1;

  // TODO bug: when submit request has an error, it starts searching again for the same result even if user didnt typed anything

  return (
    <Modal center backdrop onClose={onClose}>
      <Modal.Header>
        <Modal.Title text={title} />

        {description && <Typography component="h2">{description}</Typography>}

        <Modal.CloseButton onClose={onClose} />
      </Modal.Header>

      <Input.Label
        text="Search for a movie"
        htmlFor="searchMovie"
        formik={false}
      >
        <MovieSearchInput
          styleType="secondary"
          placeholder="Search for a movie"
          onFocus={onFocus}
          onSelectMovie={onSelect}
        />
        {/* <Input.Container styleType="secondary">
          <Input
            id="searchMovie"
            placeholder="Search for a movie"
            formik={false}
            onFocus={onFocus}
            onChange={e => {
              setSearchTerm(e.target.value);
              resetSearchResults();
            }}
          />
        </Input.Container> */}

        {errors.length > 0 && <ErrorText text={errors.join('')} />}
      </Input.Label>
    </Modal>
  );
};

export default MovieSearchModal;
