import React, { useMemo, useState } from 'react';

import { MotionProps, motion } from 'framer-motion';

import { AiFillStar } from 'react-icons/ai';

import { FiX } from 'react-icons/fi';

import { MovieProps } from '../../hooks/useMovie';

import Modal from '../Modal';

import Button from '../Button';

import Stars from './components/Stars';

interface MovieRatingModalProps {
  movie: MovieProps;
  onClose: () => void;
}

const MovieRatingModal: React.FC<MovieRatingModalProps> = ({
  movie,
  onClose,
}) => {
  const [userRating, setUserRating] = useState<number>(0);

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
      <div className="flex absolute w-screen h-screen bg-black bg-opacity-50 z-50">
        <motion.div
          className="relative w-full mt-auto rounded-t-md bg-complementaryVariant"
          {...modalAnimation}
        >
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
            <AiFillStar
              className="text-blue-500 transition-transform ease-out"
              style={{ transform: `scale(${userRating * 0.05 + 1})` }}
              size={90}
            />

            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white text-3xl font-bold select-none">
              {userRating > 0 ? userRating : '?'}
            </span>
          </div>

          <div className="flex flex-col items-center gap-4 p-4 mb-14">
            <button className="ml-auto" type="button" onClick={onClose}>
              <FiX className="text-secondary" size={28} />
            </button>

            <span className="text-yellow-500 text-sm font-semibold font-mono uppercase">
              Rate this
            </span>

            <h1 className="text-secondary text-2xl">{movie.name}</h1>

            <Stars
              userRating={userRating}
              onChange={rating => setUserRating(rating)}
            />

            <Button disabled={userRating === 0}>Rate</Button>
          </div>
        </motion.div>
      </div>
    </Modal>
  );
};

export default MovieRatingModal;
