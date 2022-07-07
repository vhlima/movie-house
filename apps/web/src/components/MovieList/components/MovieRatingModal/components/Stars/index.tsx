import React, { useState } from 'react';
import { MovieRatingStar } from '../../../../../MovieRatingStar';

interface StarsProps {
  userRating: number;
  onChange: (rating: number) => void;
}

const Stars: React.FC<StarsProps> = ({ userRating, onChange }) => {
  const [starsRating, setStarsRating] = useState<number>(0);

  const [isHoveringStars, setHoveringStars] = useState<boolean>(false);

  const handleMouseEnter = (rating: number) => {
    setStarsRating(rating);
    setHoveringStars(true);
  };

  const handleMouseLeave = () => {
    setStarsRating(0);
    setHoveringStars(false);
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(st => {
        const isChecked = isHoveringStars
          ? starsRating >= st
          : userRating >= st;

        return (
          <button
            className="p-0.5"
            type="button"
            key={st}
            onClick={() => onChange(st)}
            onMouseEnter={() => handleMouseEnter(st)}
            onMouseLeave={handleMouseLeave}
          >
            <MovieRatingStar
              color={!isChecked ? 'grey' : 'blue'}
              checked={isChecked}
              size={24}
            />
          </button>
        );
      })}
    </div>
  );
};

export default Stars;
