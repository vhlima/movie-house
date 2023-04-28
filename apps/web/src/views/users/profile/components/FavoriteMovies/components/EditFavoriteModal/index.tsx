import clsx from 'clsx';

import { useState } from 'react';

import { PreMadeListType } from '@/gql';

import { Typography, Modal, SvgIcon } from '@/components';
import { MovieCoverList2 as MovieCoverList } from '@/components/movie';
import type { ModalHandles } from '@/components';

import AddFavoriteMovieModal from './components/AddFavoriteModal';
import RemoveMovieFromPreMadeListButton from './components/RemoveMovieFromPreMadeListButton';

import { useLogic } from './logic';

type EditFavoriteMoviesModalProps = ModalHandles;

const EditFavoriteMoviesModal: React.FC<EditFavoriteMoviesModalProps> = ({
  onClose,
}) => {
  const {
    favoriteMoviesResult: { data: favoriteMoviesData },
    handleUpdateCache,
  } = useLogic();

  const [isAdding, setAdding] = useState<boolean>(false);

  if (isAdding) {
    return <AddFavoriteMovieModal onClose={() => setAdding(false)} />;
  }

  const { edges, itemsPerPage, totalCount } =
    favoriteMoviesData.preMadeListMovies || {};

  return (
    <Modal center backdrop onClose={onClose}>
      <Modal.Header>
        <Modal.Title text="Edit favorite movies" />

        <Typography component="h2">
          Select wich movies you want to be displayed in your profile.
        </Typography>

        <Modal.CloseButton onClose={onClose} />
      </Modal.Header>

      {favoriteMoviesData && (
        <MovieCoverList
          className="grid-cols-4"
          name="edit-favorite-movies-modal"
          link={false}
          empty={itemsPerPage - totalCount}
          movies={edges.map(edge => edge.node)}
          renderListItem={(index, movie) =>
            !movie ? (
              index === 0 && (
                <button
                  className="absolute top-1/4 left-1/2 transform -translate-x-1/2 translate-y-1/2 flex items-center justify-center"
                  type="button"
                  onClick={() => setAdding(true)}
                >
                  <SvgIcon iconType="AiOutlinePlusCircle" size={30} />
                </button>
              )
            ) : (
              <RemoveMovieFromPreMadeListButton
                movieId={movie.id}
                listType={PreMadeListType.Favorite}
                onCacheUpdate={movieId => handleUpdateCache(movieId)}
              />
            )
          }
        />
      )}
    </Modal>
  );
};

export default EditFavoriteMoviesModal;
