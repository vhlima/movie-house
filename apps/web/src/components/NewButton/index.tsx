import clsx from 'clsx';

import type {
  PropsWithChildren,
  ButtonHTMLAttributes,
  MouseEventHandler,
} from 'react';

import type { LinkProps } from '../Link';

import Link from '../Link';

const buttonStyles: {
  [key in ButtonOrLinkStyleType]: {
    bg: string;
    text: string;
    hover: string;
    disabled: string;
  };
} = {
  primary: {
    bg: 'bg-movieHouse-mid',
    text: 'text-white',
    hover: 'bg-movieHouse-light',
    disabled: 'bg-opacity-50',
  },
  secondary: {
    bg: 'bg-grey-700',
    text: 'text-grey-100',
    hover: 'bg-grey-600',
    disabled: 'border-grey-700',
  },
  tertiary: {
    bg: 'bg-transparent',
    text: 'text-grey-200',
    hover: 'bg-grey-600',
    disabled: 'border-transparent',
  },
  danger: {
    bg: 'bg-grey-700',
    text: 'text-danger-light',
    hover: 'bg-grey-600',
    disabled: 'border-grey-700',
  },
};

type ButtonOrLinkStyleType = 'primary' | 'secondary' | 'tertiary' | 'danger';

type ButtonProps = {
  className?: string;
  as: 'link' | 'button';
  intent?: ButtonOrLinkStyleType;
  size?: 'lg' | 'md' | 'sm' | 'xs' | 'none';
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

type Props = ButtonProps['as'] extends 'button'
  ? ButtonOnlyProps
  : LinkOnlyProps;

function isLink(props: Props): props is LinkOnlyProps {
  return props.as === 'link';
}

const ButtonOrLink: React.FC<PropsWithChildren<Props>> = props => {
  const { className, intent, as = 'button', children, ...propsLeft } = props;

  const buttonStyleProps = buttonStyles[intent];

  if (isLink(props)) {
    return <Link {...propsLeft}>{children}</Link>;
  }

  const { disabled } = props;

  return (
    <button
      className={clsx(
        'outline-none',
        buttonStyleProps.bg,
        buttonStyleProps.text,
        className,
      )}
      type="button"
      disabled={disabled}
      {...(propsLeft as unknown as ButtonOnlyProps)}
    >
      {children}
    </button>
  );
};

export default ButtonOrLink;
