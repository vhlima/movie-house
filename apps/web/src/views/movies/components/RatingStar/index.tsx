import React from 'react';

import clsx from 'clsx';

import SvgIcon from '../../../../components/SvgIcon';

interface MovieRatingStarProps {
  className?: string;
  color: 'yellow' | 'blue' | 'grey';
  size?: number;
  rating?: number;
  checked?: boolean;
  reverse?: boolean;
  marginAuto?: boolean;
}

/* 
  This component is used in any case we need to use rating stars. 
*/

const MovieRatingStar: React.FC<MovieRatingStarProps> = ({
  className,
  color,
  size = 20,
  rating,
  checked,
  reverse,
  marginAuto,
}) => {
  const star = (
    <SvgIcon
      className={clsx(className, {
        'text-grey-300': color === 'grey',
        'text-blue-500': color === 'blue',
        'text-yellow-500': color === 'yellow',
      })}
      iconType={!checked ? 'AiOutlineStar' : 'AiFillStar'}
      size={size}
    />
  );

  return !rating ? (
    star
  ) : (
    <div
      className={clsx('flex items-center gap-1', {
        'flex-row-reverse': reverse,
        'ml-auto': marginAuto,
      })}
    >
      {star}

      <span className="text-grey-200">{rating}</span>
    </div>
  );
};

export default MovieRatingStar;
