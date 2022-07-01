import React from 'react';

import SvgIcon from '../SvgIcon';

interface StarProps {
  isChecked?: boolean;
  half?: boolean;
  size?: number;
}

const Star: React.FC<StarProps> = ({ isChecked, half, size = 24 }) => {
  const starChecked = !half ? (
    <SvgIcon className="text-blue-500" iconType="AiFillStar" size={size} />
  ) : (
    <SvgIcon className="text-blue-500" iconType="AiFillStar" size={size} />
  );

  return !isChecked ? (
    <SvgIcon className="text-grey-300" iconType="AiOutlineStar" size={size} />
  ) : (
    starChecked
  );
};

export default Star;
