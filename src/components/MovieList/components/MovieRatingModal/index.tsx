import React, { useMemo, useState } from 'react';

import { MotionProps, motion } from 'framer-motion';

import { MovieProps } from '../../../../hooks/useMovie';

import Modal from '../../../Modal';

import Button from '../../../Button';

import Stars from './components/Stars';
import Backdrop from '../../../Backdrop';
import SvgIcon from '../../../SvgIcon';

interface MovieRatingModalProps {
  movie: MovieProps;
  onClose: () => void;
}

const MovieRatingModal: React.FC<MovieRatingModalProps> = ({
  movie,
  onClose,
}) => {
  const [userRating, setUserRating] = useState<number>(0);

  const handleSubmit = () => {
    onClose();
  };

  const modalAnimation: MotionProps = useMemo(
    () => ({
      initial: 'hidden',
      animate: 'visible',
      exit: {
        y: '80%',
        transition: {
          duration: 0.2,
        },
      },
      variants: {
        hidden: { opacity: 0, y: '80%' },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.2,
          },
        },
      },
    }),
    [],
  );

  return (
    <Modal portalId="modalPortal">
      <Backdrop onClick={onClose}>
        <motion.div
          className="absolute bottom-0 w-full rounded-t-md bg-grey-800 z-50"
          onClick={e => e.stopPropagation()}
          {...modalAnimation}
        >
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

          <div className="flex flex-col items-center gap-4 p-4 mb-14 text-grey-200">
            <button className="ml-auto" type="button" onClick={onClose}>
              <SvgIcon iconType="FiX" size={28} />
            </button>

            <span className="text-yellow-500 text-sm font-semibold font-mono uppercase">
              Rate this
            </span>

            <h1 className="text-2xl">{movie.name}</h1>

            <Stars
              userRating={userRating}
              onChange={rating => setUserRating(rating)}
            />

            <Button disabled={userRating === 0} onClick={handleSubmit}>
              Rate
            </Button>
          </div>
        </motion.div>
      </Backdrop>
    </Modal>
  );
};

export default MovieRatingModal;
