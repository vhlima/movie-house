import React from 'react';

import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

interface StarProps {
  isChecked?: boolean;
  half?: boolean;
  size?: number;
}

const Star: React.FC<StarProps> = ({ isChecked, half, size = 24 }) => {
  const starChecked = !half ? (
    <AiFillStar className="text-blue-500" size={size} />
  ) : (
    <AiFillStar className="text-blue-500 before:[\f089]" size={size} />
  );

  return !isChecked ? (
    <AiOutlineStar className="text-grey-300" size={size} />
  ) : (
    starChecked
  );
};

export default Star;
