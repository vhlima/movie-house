import clsx from 'clsx';

import { useMemo } from 'react';

import type { PropsWithChildren, ButtonHTMLAttributes } from 'react';

type ButtonStyleType = 'primary' | 'secondary' | 'tertiary' | 'danger';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  buttonStyle?: ButtonStyleType;
  buttonSize?: 'lg' | 'md' | 'sm' | 'xs' | 'none';
  full?: boolean;
  flex?: boolean; // TODO Change that prop to center
  border?: boolean;
  rounded?: boolean;
}

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  className,
  full = true,
  flex = true,
  rounded = true,
  border = true,
  buttonStyle = 'primary',
  buttonSize = 'sm',
  disabled,
  children,
  ...buttonProps
}) => {
  const buttonStyles: {
    [key in ButtonStyleType]: {
      bg: string;
      text: string;
      hover: string;
      outline: string;
      disabled: string;
    };
  } = useMemo(
    () => ({
      primary: {
        bg: 'bg-movieHouse-mid',
        text: 'font-semibold text-white',
        hover: 'bg-movieHouse-light',
        outline: 'focus:border-white',
        disabled: 'bg-opacity-50',
      },
      secondary: {
        bg: 'bg-grey-700',
        text: 'font-semibold text-grey-100',
        hover: 'bg-grey-600',
        outline: 'focus:border-white',
        disabled: 'border-grey-700',
      },
      tertiary: {
        bg: 'bg-transparent',
        text: 'text-grey-200',
        hover: 'bg-grey-600',
        outline: 'focus:border-white',
        disabled: 'border-transparent',
      },
      danger: {
        bg: 'bg-grey-700',
        text: 'font-semibold text-danger-light',
        hover: 'bg-grey-600',
        outline: 'focus:border-white',
        disabled: 'border-grey-700',
      },
    }),
    [],
  );

  const buttonStyleProps = buttonStyles[buttonStyle];

  return (
    <button
      className={clsx(
        'outline-none',
        buttonStyleProps.bg,
        buttonStyleProps.text,
        // buttonStyleProps.outline,
        className,
        {
          'border-2 border-transparent': border,
          'w-full h-fit': full,
          'w-fit': !full,
          'rounded-md': rounded,
          'flex items-center justify-center': flex,
          'cursor-not-allowed': disabled,
          [`transition-colors duration-300 hover:${buttonStyleProps.hover}`]:
            !disabled,
          [buttonStyleProps.disabled]: disabled,
          'p-3': buttonSize === 'lg',
          'p-2': buttonSize === 'md',
          'p-1': buttonSize === 'sm',
          'px-1': buttonSize === 'xs',
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
