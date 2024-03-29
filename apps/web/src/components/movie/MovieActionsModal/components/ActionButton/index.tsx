import type { ButtonHTMLAttributes } from 'react';

import clsx from 'clsx';

import { SvgIcon } from '@/components';

import type { SvgIconType } from '../../../../SvgIcon';

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  iconType: SvgIconType;
  iconColor?: 'blue' | 'red' | 'orange' | 'green';
}

const ActionButton: React.FC<ActionButtonProps> = ({
  text,
  iconType,
  iconColor,
  onClick,
  ...rest
}) => (
  <button
    className="flex flex-col items-center gap-1 p-2"
    type="button"
    onClick={onClick}
    {...rest}
  >
    <SvgIcon
      className={clsx(
        iconColor && {
          'text-grey-300': true,
          // 'text-warning-base': iconColor === 'orange',
          // 'text-success-base': iconColor === 'green',
          // 'text-error-dark': iconColor === 'red',
          // 'text-blue-500': iconColor === 'blue',
        },
        !iconColor && 'text-grey-300',
      )}
      iconType={iconType}
      size={30}
    />

    <span className="text-grey-200">{text}</span>
  </button>
);

export default ActionButton;
