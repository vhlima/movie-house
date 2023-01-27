import clsx from 'clsx';

import { useState } from 'react';

import {
  LimitType,
  PreMadeListType,
  useFindLimitQuery,
} from '../../../../../../../graphql';

import Modal from '../../../../../../../components/Modal';
import SvgIcon from '../../../../../../../components/SvgIcon';
import Typography from '../../../../../../../components/Typography';
import type { ModalHandles } from '../../../../../../../components/Modal';
import MovieCoverList from '../../../../../../../components/movie/MovieCoverList';

import AddFavoriteMovieModal from './components/AddFavoriteModal';
import RemoveMovieFromPreMadeListButton from './components/RemoveMovieFromPreMadeListButton';

import { useLogic } from './logic';

type EditFavoriteMoviesModalProps = ModalHandles;

const EditFavoriteMoviesModal: React.FC<EditFavoriteMoviesModalProps> = ({
  onClose,
}) => {
  /* Internal logic from component */
  const { limitResult, favoriteMoviesResult, handleUpdateCache } = useLogic();

  /* Controls whether add favorite modal is shown or not */
  const [isAdding, setAdding] = useState<boolean>(false);

  if (isAdding) {
    return <AddFavoriteMovieModal onClose={() => setAdding(false)} />;
  }

  const { data: favoriteMoviesData } = favoriteMoviesResult;

  return (
    <Modal center backdrop onClose={onClose}>
      <Modal.Header>
        <Modal.Title text="Edit favorite movies" />

        <Typography component="h2">
          Select wich movies you want to be displayed in your profile.
        </Typography>

        <Modal.CloseButton onClose={onClose} />
      </Modal.Header>

      {favoriteMoviesData && limitResult && (
        <MovieCoverList
          className="grid-cols-4"
          name="edit-favorite-movies-modal"
          link={false}
          empty={
            limitResult.limit.limit -
            favoriteMoviesData.userPreMadeListMovies.length
          }
          movies={favoriteMoviesData.userPreMadeListMovies.map(
            ({ movie }) => movie,
          )}
          renderCover={(index, movie) =>
            !movie ? (
              {
                className: clsx({
                  'hover:border-movieHouse-mid': index === 0,
                }),
                children: index === 0 && (
                  <button
                    className="flex items-center justify-center w-full h-full"
                    type="button"
                    onClick={() => setAdding(true)}
                  >
                    <SvgIcon iconType="AiOutlinePlusCircle" size={30} />
                  </button>
                ),
              }
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
