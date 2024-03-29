import type { PropsWithChildren } from 'react';

import { Typography, Input, Modal } from '@/components';
import { MovieSearchInput } from '@/components/movie';

import type { MovieSearchResult } from '@/components/movie';
import type { ModalHandles } from '@/components';

import ErrorText from '../../ErrorText';

interface MovieSearchModalProps extends ModalHandles {
  title: string;
  description?: string;
  errors?: string[];
  onFocus?: () => void;
  onSelect: (movie: MovieSearchResult) => void;
}

export const MovieSearchModal: React.FC<
  PropsWithChildren<MovieSearchModalProps>
> = ({
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
