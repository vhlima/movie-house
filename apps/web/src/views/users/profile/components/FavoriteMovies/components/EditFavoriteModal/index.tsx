import clsx from 'clsx';

import { useState } from 'react';

import { LimitType, useFindLimitQuery } from '../../../../../../../graphql';

import type { ModalHandles } from '../../../../../../../components/Modal';

import { useLogic } from './logic';

import Modal from '../../../../../../../components/Modal';

import AddFavoriteMovieModal from './components/AddFavoriteModal';

import Typography from '../../../../../../../components/Typography';

import SvgIcon from '../../../../../../../components/SvgIcon';

import MovieCoverList from '../../../../../../../components/movie/MovieCoverList';

type EditFavoriteMoviesModalProps = ModalHandles;

const EditFavoriteMoviesModal: React.FC<EditFavoriteMoviesModalProps> = ({
  onClose,
}) => {
  const {
    favoriteMoviesResult: { data: favoriteMoviesData },
    handleRemoveMovie,
  } = useLogic();

  const { data: limitData } = useFindLimitQuery({
    variables: { limitType: LimitType.MaxFavoriteMovies },
  });

  /* Controls whether add favorite modal is shown or not */
  const [isAdding, setAdding] = useState<boolean>(false);

  if (isAdding) {
    return <AddFavoriteMovieModal onClose={() => setAdding(false)} />;
  }

  return (
    <Modal center backdrop onClose={onClose}>
      <Modal.Header>
        <Modal.Title text="Edit favorite movies" />

        <Typography component="h2">
          Select wich movies you want to be displayed in your profile.
        </Typography>

        <Modal.CloseButton onClose={onClose} />
      </Modal.Header>

      {favoriteMoviesData && limitData && (
        <MovieCoverList
          className="grid-cols-4"
          name="favorite-movies-modal"
          link={false}
          empty={
            limitData.limit.limit -
            favoriteMoviesData.userPreMadeListMovies.length
          }
          movies={favoriteMoviesData.userPreMadeListMovies.map(({ movie }) => ({
            id: movie.id,
            originalTitle: movie.originalTitle,
            posterUrl: movie.posterUrl,
          }))}
          renderCover={(index, movie) =>
            !movie && {
              className: clsx({
                'hover:border-movieHouse-mid': index === 0,
              }),
              children: !movie && index === 0 && (
                <button
                  className="flex items-center justify-center w-full h-full"
                  type="button"
                  onClick={() => setAdding(true)}
                >
                  {index === 0 && (
                    <SvgIcon iconType="AiOutlinePlusCircle" size={30} />
                  )}
                </button>
              ),
            }
          }
        />
      )}

      {/* {data && (
          <MovieCardsEditable
            maxMovies={4}
            movies={
              data.userFavoriteMovies.map(
                favoriteMovie => favoriteMovie.movie,
              ) as Movie[]
            }
            onAdd={() => setAdding(true)}
            onRemove={handleRemove}
          />
        )} */}
    </Modal>
  );
};

export default EditFavoriteMoviesModal;
