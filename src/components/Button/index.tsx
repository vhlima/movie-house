import React, { PropsWithChildren, ButtonHTMLAttributes, useMemo } from 'react';

import clsx from 'clsx';

type ButtonStyleType = 'primary' | 'secondary' | 'tertiary' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  buttonStyle?: ButtonStyleType;
  buttonSize?: 'lg' | 'md' | 'sm' | 'xsm';
  full?: boolean;
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  className,
  full = true,
  buttonStyle = 'primary',
  buttonSize = 'sm',
  disabled,
  children,
  ...buttonProps
}) => {
  const buttonStyles: {
    [key in ButtonStyleType]: { bg: string; text: string; hover: string };
  } = useMemo(
    () => ({
      primary: {
        bg: 'bg-movieHouse-mid',
        text: 'text-white',
        hover: 'bg-movieHouse-light',
      },
      secondary: {
        bg: 'bg-grey-700',
        text: 'text-grey-100',
        hover: 'bg-grey-600',
      },
      tertiary: {
        bg: 'bg-transparent',
        text: 'text-grey-100',
        hover: 'bg-grey-600',
      },
      danger: {
        bg: 'bg-grey-700',
        text: 'text-danger-light',
        hover: 'bg-grey-600',
      },
    }),
    [],
  );

  const buttonStyleProps = buttonStyles[buttonStyle];

  return (
    <button
      className={clsx(
        'flex items-center justify-center rounded-md font-semibold',
        buttonStyleProps.bg,
        buttonStyleProps.text,
        className,
        {
          'w-full': full,
          'cursor-not-allowed': disabled,
          [`transition-colors duration-300 hover:${buttonStyleProps.hover}`]:
            !disabled,
          'p-3': buttonSize === 'lg',
          'p-2': buttonSize === 'md',
          'px-1 py-2': buttonSize === 'sm',
          'p-0.5': buttonSize === 'xsm',
        },
      )}
      type="button"
      disabled={disabled}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Button;
