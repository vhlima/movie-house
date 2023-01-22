import clsx from 'clsx';

import SvgIcon from '../SvgIcon';

import type { SvgIconProps } from '../SvgIcon';

interface StarIconProps extends Omit<SvgIconProps, 'iconType' | 'fill'> {
  fill?: boolean;
}

const StarIcon: React.FC<StarIconProps> = ({ className, fill, ...rest }) => (
  <SvgIcon
    className={clsx(className, {
      'text-grey-300': !fill,
      'text-blue-500': fill,
    })}
    iconType={!fill ? 'AiOutlineStar' : 'AiFillStar'}
    {...rest}
  />
);

export default StarIcon;
