import { useState } from 'react';

import { StarIcon } from '@/components';

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
      {Array.from({ length: 10 })
        .map((_, index) => index + 1)
        .map(st => {
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
              <StarIcon intent={isChecked ? 'full' : 'outline'} />
            </button>
          );
        })}
    </div>
  );
};

export default Stars;
