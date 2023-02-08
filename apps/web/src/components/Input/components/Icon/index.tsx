import clsx from 'clsx';

import type { SvgIconProps } from '../../../SvgIcon';

import SvgIcon from '../../../SvgIcon';

interface InputIconProps extends SvgIconProps {
  direction?: 'left' | 'right';
}

const InputIcon: React.FC<InputIconProps> = ({
  className,
  iconType,
  direction = 'right',
  ...props
}) => (
  <SvgIcon
    className={clsx(
      'flex-shrink-0 m-2 text-grey-300',
      {
        'ml-0': direction === 'left',
        'mr-0': direction === 'right',
      },
      className && className,
    )}
    iconType={iconType}
    size={20}
    {...props}
  />
);

export default InputIcon;
