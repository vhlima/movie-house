import clsx from 'clsx';

import { useMemo } from 'react';

import type { PropsWithChildren, ButtonHTMLAttributes } from 'react';

type ButtonStyleType = 'primary' | 'secondary' | 'tertiary' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  buttonStyle?: ButtonStyleType;
  buttonSize?: 'lg' | 'md' | 'sm' | 'xs' | 'none';
  full?: boolean;
  flex?: boolean;
  rounded?: boolean;
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  className,
  full = true,
  flex = true,
  rounded = true,
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
        text: 'text-white',
        hover: 'bg-movieHouse-light',
        outline: 'focus:border-white',
        disabled: 'bg-opacity-50',
      },
      secondary: {
        bg: 'bg-grey-700',
        text: 'text-grey-100',
        hover: 'bg-grey-600',
        outline: 'focus:border-white',
        disabled: 'border-grey-700',
      },
      tertiary: {
        bg: 'bg-transparent',
        text: 'text-grey-100',
        hover: 'bg-grey-600',
        outline: 'focus:border-white',
        disabled: 'border-transparent',
      },
      danger: {
        bg: 'bg-grey-700',
        text: 'text-danger-light',
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
        'border-2 border-transparent font-semibold outline-none',
        buttonStyleProps.bg,
        buttonStyleProps.text,
        // buttonStyleProps.outline,
        className,
        {
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
          'px-1 py-2': buttonSize === 'sm',
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

export default Button;
