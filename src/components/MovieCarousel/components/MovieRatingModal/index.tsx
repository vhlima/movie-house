import React, { useState } from 'react';

import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { FiX } from 'react-icons/fi';

import { MovieProps } from '../../../../hooks/useMovie';

import Modal from '../../../Modal';

import Button from '../../../Button';

interface MovieRatingModalProps {
  movie: MovieProps;
  onClose: () => void;
}

const MovieRatingModal: React.FC<MovieRatingModalProps> = ({
  movie,
  onClose,
}) => {
  const [isHoveringStars, setHoveringStars] = useState<boolean>(false);
  const [starsRating, setStarsRating] = useState<number>(0);
  const [userRating, setUserRating] = useState<number>(0);

  return (
    <Modal portalId="modalPortal">
      <div className="flex absolute w-screen h-screen bg-black bg-opacity-50  z-50">
        <div className="relative w-full mt-auto bg-complementaryVariant">
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
            <AiFillStar
              className="text-blue-500 transition-transform ease-out"
              style={{ transform: `scale(${userRating * 0.05 + 1})` }}
              size={90}
            />

            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white text-3xl font-bold select-none">
              {userRating === 0 ? '?' : userRating}
            </span>
          </div>

          <div className="flex flex-col items-center gap-3 p-4">
            <button className="ml-auto" type="button" onClick={onClose}>
              <FiX className="text-red-500" size={28} />
            </button>

            <span className="text-yellow-500 font-semibold font-mono uppercase">
              Rate this
            </span>

            <h1 className="text-secondary text-xl">{movie.name}</h1>

            <div className="flex">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(st => {
                const isChecked = isHoveringStars
                  ? starsRating >= st
                  : userRating >= st;

                return (
                  <button
                    className="p-1"
                    key={st}
                    type="button"
                    onClick={() => setUserRating(st)}
                    onMouseEnter={() => {
                      setStarsRating(st);
                      setHoveringStars(true);
                    }}
                    onMouseLeave={() => {
                      setStarsRating(0);
                      setHoveringStars(false);
                    }}
                  >
                    {!isChecked ? (
                      <AiOutlineStar className="text-secondary" size={26} />
                    ) : (
                      <AiFillStar className="text-blue-500" size={26} />
                    )}
                  </button>
                );
              })}
            </div>

            <Button disabled={userRating === 0}>Rate</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MovieRatingModal;
