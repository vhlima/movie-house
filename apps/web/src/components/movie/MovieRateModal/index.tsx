import { useState } from 'react';

import type { Movie } from '@/gql';

import { Button, Modal, SvgIcon, Typography } from '@/components';
import type { ModalHandles } from '@/components';

import { modalBottom } from '../../../animations';

import RatingStars from './components/RatingStars';

interface MovieRateModalProps extends Required<ModalHandles> {
  movie: Pick<Movie, 'originalTitle'>;
  onRate?: (userRating: number) => void;
}

export const MovieRateModal: React.FC<MovieRateModalProps> = ({
  movie,
  onRate,
  onClose,
}) => {
  const [userRating, setUserRating] = useState<number>(0);

  // const [userAddRateMutation, { loading }] = useMutation<{
  //   userAddRate: UserResponse;
  // }>(RATE_MOVIE);

  const handleSubmit = async () => {
    // const { data } = await userAddRateMutation({
    //   variables: {
    //     userId: user._id,
    //     movieId: movie.id,
    //     data: {
    //       rating: userRating,
    //     },
    //   },
    // });

    if (onRate) {
      onRate(userRating);
    }

    onClose();
  };

  return (
    <Modal bottom backdrop animation={modalBottom} onClose={onClose}>
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
        <SvgIcon
          className="text-blue-500 transition-transform ease-out"
          iconType="AiFillStar"
          style={{ transform: `scale(${userRating * 0.05 + 1})` }}
          size={90}
        />

        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white text-3xl font-bold select-none">
          {userRating > 0 ? userRating : '?'}
        </span>
      </div>

      <div className="flex flex-col items-center gap-4 mt-8 mb-14 text-grey-200">
        <span className="text-yellow-500 text-sm font-semibold font-mono uppercase mt-2">
          Rate this
        </span>

        <Typography
          className="font-bold"
          component="h1"
          color="primary"
          size="2xl"
        >
          {movie.originalTitle}
        </Typography>

        <RatingStars
          userRating={userRating}
          onChange={rating => setUserRating(rating)}
        />

        <Button onClick={handleSubmit}>Rate</Button>
      </div>
    </Modal>
  );
};
