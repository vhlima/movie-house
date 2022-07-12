import type { ButtonHTMLAttributes } from 'react';

import clsx from 'clsx';

import SvgIcon from '../../../../../../components/SvgIcon';

import type { SvgIconType } from '../../../../../../components/SvgIcon';

interface InfoButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  iconType: SvgIconType;
  iconColor?: 'blue' | 'red' | 'green';
}

const InfoButton: React.FC<InfoButtonProps> = ({
  text,
  iconType,
  iconColor,
  onClick,
  ...rest
}) => (
  <button
    className="flex flex-col items-center"
    type="button"
    onClick={onClick}
    {...rest}
  >
    <SvgIcon
      className={clsx(
        iconColor && {
          'text-success-base': iconColor === 'green',
          'text-error-dark': iconColor === 'red',
          'text-blue-500': iconColor === 'blue',
        },
      )}
      iconType={iconType}
      size={30}
    />

    <span className="text-grey-200">{text}</span>
  </button>
);

export default InfoButton;
