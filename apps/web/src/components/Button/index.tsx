import clsx from 'clsx';

import type {
  PropsWithChildren,
  ButtonHTMLAttributes,
  MouseEventHandler,
} from 'react';

import type { LinkProps } from '@/components';

import { Link } from '@/components';

type ButtonStyleType = 'primary' | 'secondary' | 'tertiary' | 'danger';

type ButtonSizeType = 'lg' | 'md' | 'sm';

type ButtonProps = {
  className?: string;
  intent?: ButtonStyleType;
  size?: ButtonSizeType;
  full?: boolean;
  center?: boolean;
  rounded?: boolean;
};

type ButtonOnlyProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  keyof ButtonProps
> &
  ButtonProps & {
    onClick?: MouseEventHandler<HTMLButtonElement>;
  };

type LinkOnlyProps = Omit<LinkProps, keyof ButtonProps> &
  ButtonProps & {
    onClick?: MouseEventHandler<HTMLAnchorElement>;
  };

type Props = ButtonOnlyProps | LinkOnlyProps;

const buttonStyles: {
  [key in ButtonStyleType]: {
    bg: string;
    text: string;
    hover: string;
  };
} = {
  primary: {
    bg: 'bg-movieHouse-mid',
    text: 'text-white font-bold',
    hover: 'hover:bg-movieHouse-light',
  },
  secondary: {
    bg: 'bg-grey-700',
    text: 'text-grey-100 font-bold',
    hover: 'hover:bg-grey-600',
  },
  tertiary: {
    bg: 'bg-transparent',
    text: 'text-grey-200 font-bold',
    hover: 'hover:bg-grey-600',
  },
  danger: {
    bg: 'bg-grey-700',
    text: 'text-danger-base font-bold',
    hover: 'hover:bg-grey-600',
  },
};

const buttonSizes: {
  [key in ButtonSizeType]: string;
} = {
  lg: 'px-8 h-12 text-lg',
  md: 'px-6 h-10 text-md',
  sm: 'px-4 h-8 text-sm',
};

export const Button: React.FC<PropsWithChildren<Props>> = props => {
  const {
    className,
    intent = 'primary',
    size = 'md',
    full = true,
    center = true,
    rounded = true,
    children,
    ...propsLeft
  } = props;

  const buttonStyleProps = buttonStyles[intent];

  const buttonStyleBaseClasses = clsx(
    'flex items-center outline-none transition-colors duration-300',
    buttonStyleProps.bg,
    buttonStyleProps.text,
    buttonSizes[size],
    {
      'rounded-md': rounded,
      'justify-center': center,
      'w-full': full,
    },
  );

  if ('href' in props) {
    return (
      <Link
        className={clsx(
          buttonStyleBaseClasses,
          buttonStyleProps.hover,
          className,
        )}
        {...(propsLeft as unknown as LinkOnlyProps)}
      >
        {children}
      </Link>
    );
  }

  const { disabled } = props;

  const buttonStyleClasses = clsx(
    buttonStyleBaseClasses,
    {
      [buttonStyleProps.hover]: !disabled,
      'bg-opacity-80 text-opacity-80 cursor-not-allowed': disabled,
    },
    className,
  );

  return (
    <button
      className={buttonStyleClasses}
      type="button"
      disabled={disabled}
      {...(propsLeft as unknown as ButtonOnlyProps)}
    >
      {children}
    </button>
  );
};
